import React from "react";
import * as d3 from 'd3';

const sensors = ["eeg_1", "eeg_2", "eeg_3", "eeg_4"];

function epochToTime(epochString) {
    const s = epochString.split(".")[0];
    const ms = epochString.split(".")[1];
    let date = new Date(0);

    date.setUTCSeconds(s);
    date.setUTCMilliseconds(ms);

    return date.toISOString();
}

function processData(data) {
    let fullIndexes = data.filter(d => d["eeg_1"] !== "").map(d => data.indexOf(d));

    let lastFull = {orgIndex: -1, eeg_1: 0, eeg_2: 0, eeg_3: 0, eeg_4: 0}
    let nearestFullIndex = -1;
    let delta = {};
    data.forEach(d => {
        const dIndex = data.indexOf(d);
        if (d["eeg_1"] === "") {
            if (nearestFullIndex === -1) {
                nearestFullIndex = fullIndexes.filter(i => i > dIndex).reduce((a, b) => {
                    return Math.abs(b - dIndex) < Math.abs(a - dIndex) ? b : a;
                });
                sensors.forEach(s => {
                    delta = {
                        ...delta,
                        [s]: Math.abs(lastFull[s] - data[nearestFullIndex][s]) / (nearestFullIndex - lastFull.orgIndex - 1),
                    }
                });
            }
            d["condition"] = "DERIVED";
            sensors.forEach(s => {
                d[s] = dIndex === 0 ? delta[s] : (parseFloat(data[dIndex - 1][s]) + delta[s])
            });

            // console.log("Closest full to: " + dIndex + " is: " + nearestFullIndex);
            // console.log(delta);
        } else {
            lastFull = {orgIndex: dIndex};
            sensors.forEach(s => {
                lastFull ={
                    ...lastFull,
                    [s]: parseFloat(d[s]),
                }
            })
            nearestFullIndex = -1;
            delta = 0;
            d["condition"] = "ORG";
        }
        d["isoDateTime"] = d3.isoParse(epochToTime(d["timestamps"]));
    })
    return data;
}

class Visualization extends React.Component {
    constructor(props) {
        super(props);

        this.createLineChart = this.createLineChart.bind(this);
    }

    componentDidMount() {
        this.createLineChart();
    }

    componentDidUpdate() {
        this.createLineChart();
    }



    createLineChart() {
        const data = processData(this.props.data);
        console.log(data);

        const svgWidth = this.eeg.clientWidth;
        const svgHeight = this.eeg.clientHeight;
        const margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        const eegSvg = this.eeg;
        let svg = d3.select(eegSvg)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // X axis
        let x = d3.scaleTime()
            .domain(d3.extent(data, d => d["isoDateTime"]))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        // Y axis
        let y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) {
                return + d["eeg_1"];
            })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Grid
        // let grid = g => g
        //     .attr("stroke", "grey")
        //     .attr("stroke-opacity", 0.1)
        //     .call(g => g.append("g")
        //         .selectAll("line")
        //         .data(x.ticks())
        //         .join("line")
        //         .attr("x1", d => x(d))
        //         .attr("x2", d => x(d))
        //         .attr("y1", 0)
        //         .attr("y2", height))
        //     .call(g => g.append("g")
        //         .selectAll("line")
        //         .data(y.ticks())
        //         .join("line")
        //         .attr("y1", d => y(d))
        //         .attr("y2", d => y(d))
        //         .attr("x1", 0)
        //         .attr("x2", width));
        // svg.append("g")
        //     .call(grid);

        // Path
        let color = d3.scaleOrdinal(["DERIVED", "ORG"], ["#666666","#ff7a59"]);

        let line = d3.line()
            .curve(d3.curveStep)
            .x(d => x(d["isoDateTime"]))
            .y(d => y(d["eeg_1"]));

        svg.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("x2", width)
            .selectAll("stop")
            .data(data)
            .join("stop")
            .attr("offset", d => x(d["isoDateTime"]) / width)
            .attr("stop-color", d => color(d.condition));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "url(#linear-gradient)")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);


    }


    render() {
        return (
            <svg ref={eeg => this.eeg = eeg} width="100%" height={300}/>
        )
    }
}

export default Visualization;