import "./index.css";
import BasicTable from "./Table";
import logo from './images/protomolecule.png'

export default function App() {
  return (
    <div className="App bg-gradient-to-r from-protoSteel via-protoBlue to-protoTeal font-robotoSlab px-3">
              <div className="grid grid-cols-3 grid-rows-2 mobile:{grid-cols-2 grid-rows-2 } max-h-fit">
                    <img src={logo}  alt='company logo' className="mt-20 -mb-10 h-24"/>
                    <h2 className="underline flex items-center mobile:text-3xl mobile:whitespace-nowrap sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Protogen Industries</h2>
                    <p className="flex items-end mobile:text-sm sm:whitespace-nowrap sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">"First. Fastest. Furthest" </p>
                <div className="underline flex whitespace-nowrap col-start-2 row-start-2 items-end justify-center text-2xl mb-3 lg:text-5xl md:text-4xl mobile:text-xl mobile:-top-20 xl:-top-20">
                  <h2>Protogen Scored Opportunites Chart</h2>
                </div>
              </div>
        <BasicTable></BasicTable>
    </div>
  );
}




