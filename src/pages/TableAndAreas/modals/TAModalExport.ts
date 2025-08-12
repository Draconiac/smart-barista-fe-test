import React from "react";
import TAAddNewArea from "./TAAddNewArea";
import TAEditArea from "./TAEditArea";
import TAAddNewTable from "./TAAddNewTable";
import TAAddNewTableBulk from "./TAAddNewTableBulk";

export const taModalMap : Map<string, React.ComponentType<any>>  = new Map();

taModalMap.set("TAAddNewArea", TAAddNewArea);
taModalMap.set("TAEditArea", TAEditArea);
taModalMap.set("TAAddNewTable", TAAddNewTable);
taModalMap.set("TAAddNewTableBulk", TAAddNewTableBulk);
    

