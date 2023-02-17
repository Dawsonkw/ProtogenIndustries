import React, { useEffect, useState }  from 'react';
import opportunities from '../opportunities.json';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

function Card({selectedData}) {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [probabilityHistory, setProbabilityHistory] = useState([]);
    const [increasingWins, setIncreasingWins] = useState([]);
    const [decreasingWins, setDecreasingWins] = useState([]);
    

    // Data handler for top level JSON data
    useEffect(() => {
        setData(opportunities)
    }, []) 

    // Data handler for nested JSON data
    useEffect(() => {
        // flatmap is mapping the array of arrays and flattening it to one single array so it is accessible
        const newProbabilityHistory = opportunities.flatMap((item) => {
            return item.probabilityHistory ?
                item.probabilityHistory.map((history) => {
                    return {
                        daysAgo: history.daysAgo,
                        pxProb: history.protogenProb,
                        repProb: history.repProb,
                        }
                    })
                : [];
            })
            setProbabilityHistory(newProbabilityHistory);
            
        const newIncreasingWins = opportunities.flatMap((item) => {
            return item.protogenFactorsIncreasingWin ?
                item.protogenFactorsIncreasingWin.map((win) => {
                    return {
                        name: win.name,
                        message: win.message,
                        weightVal: win.weight.value,
                        weightDesc: win.weight.description,
                        oppId: win.oppId
                        }
                    })
                : [];
            })
            setIncreasingWins(newIncreasingWins);

        const newDecreasingWins = opportunities.flatMap((item) => {
            return item.protogenFactorsDecreasingWin ?
                item.protogenFactorsDecreasingWin.map((dWin) => {
                    return {
                        name: dWin.name,
                        message: dWin.message, 
                        weightVal: dWin.weight.value,
                        weightDesc: dWin.weight.description,
                        index: dWin.index
                        }                          
                    })                     
                : [];                
            })
            setDecreasingWins(newDecreasingWins);
    }, []);

    return (
        <div>
            {selectedData ? (
                <div>
                    <Dialog 
                        open={isOpen}
                        onClose={() => setIsOpen(false)
                    }>

                        <DialogContent >      
                            {/* Top level JSON data as hooks for use in Table.js file */}
                            {selectedData.salesRepName}       
                            {selectedData.repProbability}
                            {selectedData.protogenProbability}             
                            {selectedData.oppName}
                            {selectedData.stage}
                            {selectedData.product}
                            {selectedData.amount}
                            {selectedData.protogenTier}

                            {/* Probability History nested values as hooks */}
                            {selectedData.probabilityHistory?.filter(history => history?.daysAgo).map(history => (history.daysAgo))}
                            {selectedData.probabilityHistory?.filter(history => history?.protogenProb).map(history => (history.protogenProb))}
                            {selectedData.probabilityHistory?.filter(history => history?.repProb).map(history=> (history.repProb))}         

                            {/* PX Increasing Win Factors nested values as hooks */}
                            {selectedData.protogenFactorsIncreasingWin?.filter(win => win?.name).map(win => win?.name)}
                            {selectedData.protogenFactorsIncreasingWin?.filter(win => win?.message).map(win => win?.message)}
                            {selectedData.protogenFactorsIncreasingWin?.filter(win => win?.weight?.value).map(win => win?.weight?.value)}
                            {selectedData.protogenFactorsIncreasingWin?.filter(win => win?.weight?.description).map(win => win?.weight?.description)}

                            {/* PX Decreasing Win Factors nested values as hooks */}
                            {selectedData.protogenFactorsDecreasingWin?.filter(dWin => dWin?.name).map(dWin => dWin?.name)}
                            {selectedData.protogenFactorsDecreasingWin?.filter(dWin => dWin?.message).map(dWin => dWin?.message)}
                            {selectedData.protogenFactorsDecreasingWin?.filter(dWin => dWin?.weight?.value).map(dWin => dWin?.weight?.value)}
                            {selectedData.protogenFactorsDecreasingWin?.filter(dWin => dWin?.weight?.description).map(dWin => dWin?.weight?.description)}
                            {selectedData.protogenFactorsDecreasingWin?.filter(dWin => dWin?.index).map(dWin => dWin?.index)}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsOpen(false)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ) : null}
        </div>
      );
}

export default Card;
