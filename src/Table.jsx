import React, { useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "./components/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import * as opportunities from "./opportunities.json";
import { VictoryPie, VictoryBar, VictoryContainer, VictoryLabel, VictoryChart, VictoryAxis, VictoryLegend, VictoryGroup, } from "victory";
import { BsFillStarFill } from 'react-icons/bs';
import ProgressBar from "@ramonak/react-progress-bar";
import './index.css';


export default function BasicTable(props) {
    
    // useState constants
    const [selectedData, setSelectedData] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState("paper");
    const [winDescription, setWinDescription] = useState(null);
    const [dWinDescription, setDWinDescription] = useState(null);
    const [selectedWinMessage, setSelectedWinMessage] = useState(null);
    const [selectedDWinMessage, setSelectedDWinMessage] = useState(null);

    const data = opportunities.default;

    // Handler opens the row to display the data in a dialog box
    function handleRowClick(event, row, scrollType) {
      setSelectedData(row);
      setOpen(true);
      setScroll(scrollType)
    }

    // Handler closes dialog box
    function handleClose() {
      setOpen(false);
      setSelectedData(null);
    }


    // PG Factors Increasing Wins Pie chart Color palette
    const colorScaleIW = [
      "#E8F5E9",
      "#DCEDC8",
      "#C5E1A5",
      "#AED581",
      "#9CCC65",
      "#8BC34A",
      "#7CB342",
      "#689F38",
      "#558B2F",
      "#33691E",
      "#2E7D32",
      "#228B22",
      "#1B5E20",
      "#0B3E3B",
      "#004D40"
    ];

    // PG Factors Decreasing Wins Pie chart Color palette
    const colorScaleDW = [
      "#FFEBEE",
      "#FFCCCB",
      "#FFB2B2",
      "#FF9999",
      "#FF8080",
      "#FF6666",
      "#FF4D4D",
      "#FF3333",
      "#FF1A1A",
      "#E53935",
      "#D32F2F",
      "#C62828",
      "#B71C1C",
      "#8B0000",
      "#7F0000"
    ];

    // Data Handler for Increasing wins nested JSON values 
    const winData = selectedData?.protogenFactorsIncreasingWin
      ? selectedData?.protogenFactorsIncreasingWin.map(win => ({
      name: win.name,
      message: win.message,
      weightVal: win.weight.value,
      weightDesc: win.weight.description
      }))
    : [];
    
    // Data Handler for Decreasing wins nested JSON values 
    const dWinData = selectedData?.protogenFactorsDecreasingWin
        ? selectedData?.protogenFactorsDecreasingWin.map(dWin => ({
        name: dWin.name,
        message: dWin.message,
        weightVal: dWin.weight.value,
        weightDesc: dWin.weight.description
      }))
    : [];
    
    // Data Handler for Probability History nested JSON values 
    const probabilityHistoryData = selectedData?.probabilityHistory 
        ? selectedData?.probabilityHistory.map(history => ({
        daysAgo: history.daysAgo,
        protogenProb : history.protogenProb,
        repProb: history.repProb
      }))
    : []; 

    // Filters Probability History Data to exclude for null values and maps data for use in charts 
    const histY1 = probabilityHistoryData.filter(history => history.protogenProb !== null).map(history => ({x: history.daysAgo, y: history.protogenProb}));
    const histY2 =  probabilityHistoryData.filter(history => history.repProb !== null).map(history => ({x: history.daysAgo, y: history.repProb}));
    
    // Data handler for PG Increasing Win pie chart Legend as a weighted value distribution
    const legendDataIW = [
      { name: "Lowest Increasing Win Weight", symbol: { fill: colorScaleIW[0] } },
      { name: "Middle Increasing Win Weight", symbol: { fill: colorScaleIW[Math.floor(colorScaleIW.length / 2)] } },
      { name: "Greatest Increasing Win Weight", symbol: { fill: colorScaleIW[colorScaleIW.length - 1] } }
    ];
    
    // Data handler for PG Decreasing Win pie chart Legend as a weighted value distribution
    const legendDataDW = [
      { name: "Lowest Decreasing Win Weight", symbol: { fill: colorScaleDW[0] } },
      { name: "Middle Decreasing Win Weight", symbol: { fill: colorScaleDW[Math.floor(colorScaleDW.length / 2)] } },
      { name: "Greatest Decreasing Win Weight", symbol: { fill: colorScaleDW[colorScaleDW.length - 1] } }
    ];
    
    // Data handler for assigning string value to star icons
    const StarMap = {
      "5 Stars": 5,
      "4 Stars": 4,
      "3 Stars": 3,
      "2 Stars": 2,
      "1 Star": 1
    }

    // Takes in PG Tier data as a conditional render and assigns it to a constant 
    const rating = StarMap[selectedData?.protogenTier] || 0;

    // Assigns PG Tier data to a value in stars using star icons
    const StarRating = ({rating}) => {
      const stars = [];
      for(let i=0; i<5; i++) {
        if(i<rating) {
          stars.push(<BsFillStarFill key={i} />);
        } else {
          stars.push(<BsFillStarFill key={i} style={{opacity: 0.2}} />);
        }
      }
      return <div style={styles.container}>{stars}</div>
    }

    // Styles star icons
    const styles = {
      container: {
        display: "flex",
        alignItems: "center",
        color: "#f37834",
      }
    };

    // Assigns PG probability and Rep probabilty as constants for use in visual gauges
    const pilyRatio = selectedData?.protogenProbability;
    const repRatio = selectedData?.repProbability;

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow className="bg-gold font-robotoSlab">
              <TableCell className="text-xl" align="left">Name</TableCell>
              <TableCell className="text-xl" align="left">Stage</TableCell>
              <TableCell className="text-xl" align="right">Rep Probability</TableCell>
              <TableCell className="text-xl" align="right">PG Probability</TableCell>
              <TableCell className="text-xl" align="left">PG Tier</TableCell>
              <TableCell className="text-xl" align="right">Amount</TableCell>
              <TableCell className="text-xl" align="left">Product</TableCell>
              <TableCell className="text-xl" align="left">Sales Representative</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
              className="bg-silver"
                onClick={(event) => {handleRowClick(event, row)}}
                key={row.oppId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Reverses the oppName value so that formatting makes more sense */}
                <TableCell component="th" scope="row" className="text-lg font-robotoSlab">
                  {row.oppName.split("-").reverse().join("-")}
                </TableCell>
                {/* Alters the stage string so that the number itself is removed but string is left */}
                <TableCell align="left" className="py-10 text-lg font-robotoSlab">{row.stage.split(".")[1].trim()}</TableCell>
                <TableCell align="right" className="text-lg font-robotoSlab">{row.repProbability}</TableCell>
                <TableCell align="right" className="text-lg font-robotoSlab">{row.protogenProbability}</TableCell>
                <TableCell align="left" className="text-lg font-robotoSlab">{row.protogenTier}</TableCell>
                {/* Converts number string into dollar format for added formatting */}
                <TableCell align="right" className="text-lg font-robotoSlab">{row.amount.toLocaleString("en-US", {style: "currency", currency: "USD"})}</TableCell>
                <TableCell align="left" className="text-lg font-robotoSlab">{row.product}</TableCell>
                <TableCell align="left" className="text-lg font-robotoSlab">{row.salesRepName}</TableCell>
              </TableRow>
            ))}
          </TableBody>    
        </Table> 
          {/* Conditionally renders dialog box */}
          {selectedData ? <Card selectedData={selectedData} /> : null}
          <Dialog 
            fullWidth
            maxWidth="lg"
            scroll={scroll}
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="font-robotoSlab text-center text-4xl bg-gold">Opportunity Details</DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
              <div className="p-6 my-2 mx-2 rounded-lg shadow-xl bg-silver font-robotoSlab">
                  <div className="grid grid-cols-3 grid-rows-2 text-lg">
                    <div className="col-start-1 row-start-1 flex flex-col items-start -space-y-1">
                      <p className="-my-1 text-3xl underline"> <b>{selectedData?.salesRepName}</b></p>
                      <div className="col-start-1 row-start-1 flex flex-col -space-y-1 items-start -my-3">
                        <p><b>Product:</b> {selectedData?.product}</p>
                        <p><b>Amount:</b> {selectedData?.amount.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                      </div>
                    </div>
                    <div className="col-start-3 row-start-1 flex flex-col items-end -space-y-1 pr-3">
                      {/*  Converts num string into a visual gauge for average representative probability*/}
                      <p className="inline-flex PG-2"><b>Rep Probability:</b> 
                        <ProgressBar 
                        // Converts decimal to percent format
                        completed={Math.round(repRatio * 100)} 
                        className="wrapper PG-2"
                        maxCompleted={100}
                        margin={5}
                        bgColor="#f37834"
                        baseBgColor="#34b0f3"
                        labelAlignment="right, outside"
                        width="150%"
                        animateOnRender="true"
                        />
                      </p>
                      {/*  Converts num string into a visual gauge for average protogen probability*/}
                      <p className="inline-flex PG-2"><b>Protogen Probability:</b> 
                        <ProgressBar 
                        // Converts decimal to percent format
                        completed={Math.round(pilyRatio * 100)} 
                        className="wrapper PG-2"
                        maxCompleted={100}
                        margin={5}
                        bgColor="#f37834"
                        baseBgColor="#34b0f3"
                        labelAlignment="right, outside"
                        width="150%"
                        animateOnRender="true"
                        />
                      </p>
                    </div>
                    <div className="col-start-2 row-start-2 flex flex-col -space-y-1 text-center whitespace-nowrap items-start">
                      {/* Target and Stage Strings formatted for better clarity */}
                      <p><b>Business Target:</b> {selectedData?.oppName.split("-").reverse().join("-")}</p>
                      <p><b>Current Stage:</b> {selectedData?.stage.split(".")[1].trim()}</p>
                      <div className="inline-flex space-x-2">
                        <p className="font-bold">Protogen Tier: </p>
                        <StarRating rating={rating} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-25 ">
                  <div className=" rounded-lg shadow-xl font-robotoSlab bg-silver">
                <p className="text-center text-md">Click a given section for more information about Protogens increasing or decreasing win factors</p> 
                    {/* protogen Increasing Win Factors pie chart and legend are conditionally rendered so if dataset is null the graph does not appear */}
                    {winData.length > 0 &&(
                    <div>
                      {/* Pie chart for Increasing Wins data created with Formidable using Victory Charts  */}
                    <VictoryPie
                        standalone={true}
                        fixLabelOverlap={true}
                        colorScale={colorScaleIW}
                        data={winData}
                        x="weightVal"
                        y="name"
                        padding={{top: 70, left:50, bottom:70, right:50}}                     
                        labelPlacement="parallel"              
                        labels={({ datum }) => datum.name}
                        labelComponent={                           
                        <VictoryLabel
                          style={{
                              fontSize: 5,
                              fontWeight: "bold"
                          }} 
                          renderInPortal={true}
                        />
                        }
                        // Events handler allows for further representation of data that wouldn't normally fit into graph itself, A hover event over the chart section leads to displaying the weight positivity correlation and a click event on a certain chart section displays a message associated with that data point. A higher weight leads to a greater size sectioning of the chart. 
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onMouseOver: () => {
                                return [
                                  {
                                    target: "labels",
                                    mutation: ({ datum }) => ({
                                      text: `${datum.name}\n${datum.weightDesc}`
                                    })
                                  },
                                  {
                                    target: "data",
                                    mutation: (props) => {
                                      setWinDescription(props.datum.weightDesc);
                                      return {
                                        style: { fill: "green" }
                                      };
                                    }
                                  }
                                ];
                              },
                              onMouseOut: () => {
                                return [
                                  {
                                    target: "labels",
                                    mutation: () => ({ active: false })
                                  },
                                  {
                                    target: "data",
                                    mutation: () => {
                                      setWinDescription(null);
                                      return null;
                                    }
                                  }
                                ];
                              },
                              onClick: (event, props) => {
                                const selectedData = props.datum;
                                
                                setSelectedWinMessage(selectedData.message);
                                return null;
                              }

                            }
                          }
                        ]}
                    />
                    {/* Corresponding message is displayed as a text element below the chart */}
                    <div className="text-center text-xl py-4">
                      {selectedWinMessage && <div>{selectedWinMessage}</div>}
                    </div>
                    {/* protogen Decreasing Win Factors pie chart and legend are conditionally rendered so if dataset is null the graph does not appear */}
                    {winData.length > 1 && (
                      <VictoryLegend
                      data={legendDataIW}
                      colorScale={colorScaleIW}
                      x={50}
                      y={1}
                      gutter={20}
                      style={{
                        labels: {
                          fontSize: 7,
                          fill: "black"
                        }
                      }}
                      orientation='horizontal'
                      height={25}
                    />
                    )}
                    </div>
                    )}
                      {dWinData.length > 0 && ( 
                        <div>
                          {/* Pie chart for Decreasing Wins data created with Formidable using Victory Charts  */}
                          <VictoryPie
                          standalone={true}
                            fixLabelOverlap={true}
                            colorScale={colorScaleDW}
                            data={dWinData}
                            x="weightVal"
                            y="name"
                            padding={70}
                            labelPlacement="parallel"
                            containerComponent={
                              <VictoryContainer
                                  responsive={true}
                                />
                              }
                            labels={({ datum }) => datum.name}
                            labelComponent={
                            <VictoryLabel
                              style={{
                                fontSize: 5,
                                fontWeight: "bold"
                              }}
                              renderInPortal={true}
                            />
                            }
                            // Events handler allows for further representation of data that wouldn't normally fit into graph itself, functionality is same as above event handler
                            events={[
                              {
                                target: "data",
                                eventHandlers: {
                                  onMouseOver: () => {
                                    return [
                                      {
                                        target: "labels",
                                        mutation: ({ datum }) => ({
                                          text: `${datum.name}\n${datum.weightDesc}`
                                        })
                                      },
                                      {
                                        target: "data",
                                        mutation: (props) => {
                                          setDWinDescription(props.datum.weightDesc);
                                          return {
                                            style: { fill: "red" }
                                          };
                                        }
                                      }
                                    ];
                                  },
                                  onMouseOut: () => {
                                    return [
                                      {
                                        target: "labels",
                                        mutation: () => ({ active: false })
                                      },
                                      {
                                        target: "data",
                                        mutation: () => {
                                          setDWinDescription(null);
                                          return null;
                                        }
                                      }
                                    ];
                                  },
                                  onClick: (event, props) => {
                                    const selectedData = props.datum;
                                    setSelectedDWinMessage(selectedData.message);
                                    return null;
                                  }
                                }
                              }
                            ]}            
                          />
                          {/* Corresponding message is displayed as a text element below the chart */}
                          <div className="text-center text-xl py-4">
                            {selectedDWinMessage && <div>{selectedDWinMessage}</div>}
                          </div>                        
                        {winData.length > 1 && (
                          <VictoryLegend
                          data={legendDataDW}
                          colorScale={colorScaleDW}
                          x={50}
                          y={1}
                          gutter={20}
                          style={{
                            labels: {
                              fontSize: 7,
                              fill: "black"
                            }
                          }}
                          orientation='horizontal'
                          height={25}
                        />
                        )}
                        </div>
                      )}
                      {/* Bar Chart displays PG Probability and Representative Probabilty values as a function of x (days ago) the chart and legend are conditionally rendered so if the dataset is null it does not appear. */}
                      {histY1.length > 0 || histY2.length > 0 ?
                      <VictoryChart>   
                          <VictoryGroup
                            offset={4}
                            domainPadding={{ x: 1 }}
                            // width={}
                          >
                          <VictoryBar
                            data={histY1}
                            y="y"
                            x="x"
                            label="Days Ago"
                            style={
                              {data: {fill: "#f37834"}}
                            }   
                          />
                          <VictoryBar
                            data={histY2}
                            y="y"
                            x="x"
                            dependentAxis
                            label="Days Ago"
                            style={
                              {data: {fill: "#34b0f3"}
                              }
                            }                    
                          />
                          </VictoryGroup>   
                          {histY1.length > 0 && (
                            <VictoryAxis 
                              dependentAxis
                              domain={[0, 1]}          
                              label="Protogen Probability"    
                              style={{tickLabels: {fontSize: 8}}} 
                            />    
                          )}
                          {histY2.length > 0 && (
                            <VictoryAxis 
                              label="Days Ago"
                              tickValues={histY1.map(dataPoint => dataPoint.x)}
                              tickCount={10}
                              style={{tickLabels: {fontSize: 8}}}
                            />
                          )}
                          {histY1.length > 0 && histY2.length > 0 && (
                            <VictoryAxis 
                              dependentAxis
                              domain={[0, 1]}                    
                              orientation= "right"
                              label="Rep Probability"
                              style={{tickLabels: {fontSize: 8}}}
                            />
                          )}
                          <VictoryLegend x={75} y={30}
                            orientation="horizontal"
                            gutter={20}
                            style={{ border: { stroke: "black" } }}
                            data={[
                              { name: "Protogen Probability", symbol: { fill: "#f37834" } },
                              { name: "Rep Probability", symbol: { fill: "#34b0f3" } }
                            ]}
                          />
                      </VictoryChart>
                      : null }
                    </div>
                  </div>                                           
                </div>
              </DialogContent>
          <DialogActions>
            {/* Button closes dialog box to return to table */}
            <Button className="bg-gradientTeal text-midGradientPurp" onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>    
    );
}


