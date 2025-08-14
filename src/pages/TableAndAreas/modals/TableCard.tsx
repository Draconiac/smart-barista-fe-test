import api from "../../../api";

type Props = {
  id: string;
  name: string;
  isActive: boolean;
  getTables?: () => void;
};

export default function Table({ id, name, getTables }: Props) {
  
  const deleteTable = () => {
    if (id) {
      api
        .delete(`/tables/${id}`)
        .then(() => {
          if (getTables) getTables();
        })
        .catch((error) => {
          console.error("Silme işleminde hata oluştu:", error);
        });
    }
  };

  // const updateTable = () => {
  //   if (id) {
  //     api
  //       .put(`/tables/${id}`)
  //       .then(() => {
  //         if (getTables) getTables();
  //       })
  //       .catch((error) => {
  //         console.error("Silme işleminde hata oluştu:", error);
  //       });
  //   }
  // }

  return (
    <div style={{ width: 100, height: 100, backgroundColor: "white" }}>
      {/* <div>
        <button onClick={deleteTable}>Güncelle</button>
      </div> */}
      <div>
        <button onClick={deleteTable}>Sil</button>
      </div>
      <div>{name}</div>
    </div>
  );
}
