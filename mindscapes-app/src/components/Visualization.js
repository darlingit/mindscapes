import React from "react";
import * as d3 from 'd3';
import SensorOptions from "./SensorOptions";

const sensors = ["eeg_1", "eeg_2", "eeg_3", "eeg_4"];
const colors = {
    derived: "#666666",
    eeg_1: "rgba(255,122,89,1)",
    eeg_2: "rgba(0,170,141,1)",
    eeg_3: "rgba(0,191,255,1)",
    eeg_4: "rgba(255,177,0,1)",
}

let colorScales = {};


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
                lastFull = {
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
        this.displayOptions = this.displayOptions.bind(this);
        this.showSensor = this.showSensor.bind(this);

    }

    componentDidMount() {
        sensors.forEach(s => {
            colorScales[s] = d3.scaleOrdinal(["DERIVED", "ORG"], [colors.derived, colors[s]])
        });
        this.createLineChart();
    }

    // componentDidUpdate() {
    //     this.createLineChart();
    // }

    createLineChart() {
        const data = processData(this.props.data);

        let sensorValues = [];
        sensors.forEach(s => {
            sensorValues.push(data.map(d => d[s]));
        })
        sensorValues = sensorValues.flat(1);


        const svgWidth = this.eeg.clientWidth;
        const svgHeight = this.eeg.clientHeight;
        const margin = {top: 10, right: 30, bottom: 30, left: 50},
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        const eegSvg = this.eeg;


        let zoom = d3.zoom()
            .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
            .extent([[0, 0], [width, height]])
            .on("zoom", updateChart);

        let svg = d3.select(eegSvg)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.append("rect").attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(zoom);
        // svg.call(d3.brush().extent([[0, 0], [width, height]]));

        // X axis
        let x = d3.scaleTime()
            .domain(d3.extent(data, d => d["isoDateTime"]))
            .range([0, width]);
        let xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        // Y axis
        let y = d3.scaleLinear()
            .domain([0, d3.max(sensorValues)])
            .range([height, 0]);
        let yAxis = svg.append("g")
            .call(d3.axisLeft(y));


        // Clip window
        svg.append("defs").append("SVG:clipPath")
            .attr("id", "clip")
            .append("SVG:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        let paths = svg.append('g')
            .attr("clip-path", "url(#clip)");

        // Path
        sensors.forEach(s => {
            let line = d3.line()
                .curve(d3.curveStep)
                .x(d => x(d["isoDateTime"]))
                .y(d => y(d[s]));

            paths.append("linearGradient")
                .attr("id", `linear-gradient-${s}`)
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", 0)
                .attr("x2", width)
                .selectAll("stop")
                .data(data)
                .join("stop")
                .attr("offset", d => x(d["isoDateTime"]) / width)
                .attr("stop-color", d => colorScales[s](d.condition));

            paths.append("path")
                .datum(data)
                .attr("id", "path-" + s)
                .attr("fill", "none")
                .attr("stroke", "url(#linear-gradient-" + s + ")")
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line);

        });


        function updateChart() {
            let newX = d3.event.transform.rescaleX(x);
            xAxis.call(d3.axisBottom(newX))

            sensors.forEach(s => {
                let line = d3.line()
                    .curve(d3.curveStep)
                    .x(d => newX(d["isoDateTime"]))
                    .y(d => y(d[s]));

                paths.select(`#linear-gradient-${s}`)
                    .selectAll("stop")
                    .attr("offset", d => newX(d["isoDateTime"]) / width)
                    .attr("stop-color", d => colorScales[s](d.condition));

                paths.select(`#path-${s}`)
                    .attr("d", line);
            })
        }
    }

    changeColors(sensor, color) {
        const rgbaColor = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
        console.log(rgbaColor);
        colorScales[sensor] = d3.scaleOrdinal(["DERIVED", "ORG"], [colors.derived, rgbaColor]);
        d3.select(`#linear-gradient-${sensor}`)
            .selectAll("stop")
            .attr("stop-color", d => colorScales[sensor](d.condition));
    }

    displayOptions(checkBoxes) {
        if (this.props.displayOptions) {
            return (
                <div className="options ml-5 mt-5">
                    {checkBoxes}
                </div>
            )
        }
    }

    showSensor(checkbox) {
        let opacity = checkbox.checked ? 1 : 0;
        d3.select(`#path-${checkbox.id}`).style("opacity", opacity);
    }


    render() {
        let checkBoxes = [];
        sensors.forEach((s, i) => {
            checkBoxes.push(<SensorOptions sensor={s} color={colors[s]} key={i} showSensor={this.showSensor}
                                           changeColor={this.changeColors}/>);
        });

        return (
            <React.Fragment>
                <svg ref={eeg => this.eeg = eeg} width="100%" height={300}/>
                {this.displayOptions(checkBoxes)}
            </React.Fragment>
        )
    }
}

export default Visualization;