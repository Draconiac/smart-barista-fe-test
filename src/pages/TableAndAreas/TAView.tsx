import { useAppSelector } from "../../app/hooks";

const TAView = () => {
  const tables = useAppSelector((state) => state.table.tables);

  const asd = () =>{
      console.log({"tables": tables})
    }

    const map = new Map(Object.entries(tables));

  return (

  
  <div>
      <button onClick={() => {asd()}}>AA</button>
      {
        
          map.get("Salon")?.map((i) => (
            <button>{i}</button>
          ))

      }
  </div>);
};

export default TAView;
