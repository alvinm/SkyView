import { Geolocation } from "@capacitor/geolocation";
import { getIconMap } from "ionicons/dist/types/components/icon/utils";
import { archive, documentOutline, documentText, grid, image, videocam } from "ionicons/icons";
import * as XLSX from "xlsx";
export const getLocation = async () =>{
    var position = await Geolocation.getCurrentPosition();
    var setLocation:any = []
    setLocation.push({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });;
    return setLocation[0]
}
export const addCommas = (number: any) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/,(\d{2})$/, '.$1');
};
export const HighchartsDate = (date:any)=> {
  const parsedDate:any = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate)) {
    console.log('Invalid date provided');
  }
    // Return timestamp (milliseconds since epoch)
    return parsedDate.getTime();
}
export const formatDate = (dated:any)=> {
  const dateString = dated;
  const date = new Date(dateString);
  const year = date.getFullYear(); // Get the full year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, pad with leading zero
  const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
  return `${year}-${month}-${day}`; // Combine into yyyy-MM-dd
}
export const formatDateTime = (isoString:any) => {
const date = new Date(isoString);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const day = String(date.getDate()).padStart(2, "0");
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");

// Combine into desired format
return `${year}-${month}-${day} ${hours}:${minutes}`;
};
export function isNumeric(str:any){
//console.log("test:"+isNaN(str/1))
if(!isNaN(str/1) && str != ' ' && str != ''){
    return true
}else{
    return false
}
}
export const exportToExcel = (data:any) => {
// Step 1: Convert the array to a worksheet
const worksheet = XLSX.utils.json_to_sheet(data);

// Step 2: Create a new workbook and append the worksheet
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Step 3: Write the workbook and trigger the download
XLSX.writeFile(workbook, "ExportedData.xlsx");
};
export function isDate(s:any){
var bits = s.split('-');
console.log(bits[0] + '/' + bits[1] + '/' + bits[2])
var d = new Date(bits[0] + '/' + bits[1] + '/' + bits[2]);
return !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]));
}

export const callProductImage = async (props:any) =>{
  let stream:any = ''
  stream = await fetch(props.state.secondary_host+'getImage?dbo=select_product_image'+
      "&barcode_id="+props.barcode
  )
  
  const blob  = await stream.blob();
  const url:string = URL.createObjectURL(blob);
  console.log(url)
  return url
}
const pastelColors = [
  "#FF6B6B", // bright coral red
  "#FFB347", // vivid orange
  "#FFD93D", // solid yellow
  "#6BCB77", // fresh green
  "#4D96FF", // bright blue
  "#A66DD4", // purple
  "#FF7EB3", // pink
  "#57C7E3", // sky blue
  "#50C878", // emerald green
  "#FFDE59", // gold yellow
  "#FF914D", // pumpkin
  "#7ED957"  // lime green
];

// 🔑 2. Simple hash function to map username to a color index
export const getPastelColor = (username:any) => {
  if(username != null){
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % pastelColors.length;
    return pastelColors[index];
  }
};
export const getIconForMimeType = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return image;
    if (mimeType.startsWith("video/")) return videocam;
    if (mimeType === "application/pdf") return documentOutline;
    if (mimeType === "text/plain") return documentText;
    if (mimeType === "application/zip") return archive;
    if (mimeType.includes("spreadsheet")) return grid;
    return documentOutline;
};