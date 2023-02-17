import "./index.css";
import BasicTable from "./Table";
import logo from './images/kitsune-logo.png'

export default function App() {
  return (
    <div className="App bg-gradient-to-r from-kitsuneBlue via-kitsuneOrange2 to-kitsuneOrange font-robotoSlab ">
        
              <div className="grid grid-cols-3 grid-rows-2 max-h-fit">
                <div className="flex- flex-col -my-5">
                  <div className="flex col-start-1 row-start-1">
                    <img src={logo} style={{width: 150, height: 275}} alt='company logo' className=""/>
                    <h2 className=" text-6xl font-robotoSlab underline mt-20 xl:text-7xl">Protogen Industries</h2>
                  </div>
                  
                  <div className="flex col-start-1 row-start-1 items-end justify-end sm:text-3xl -mt-10 px-3 lg:text-4xl md:text-4xl mobile:text-xl">
                    <p>"First. Fastest. Furthest" </p>
                  </div>
                </div>
                
                        
                <div className="flex whitespace-nowrap col-start-2 row-start-2 items-end justify-center text-2xl mb-3 lg:text-5xl md:text-4xl mobile:text-xl mobile:-top-20">
                  <h2>Protogen Scored Opportunites Chart</h2>
                </div>
              </div>
        <BasicTable></BasicTable>
    </div>
  );
}




{/* bg-gradient-to-r from-kitsuneBlue via-kitsuneOrange2 to-kitsuneOrange */}
