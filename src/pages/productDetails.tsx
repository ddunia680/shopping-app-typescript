import { useParams } from "react-router"

export default function ProductDetails() {
  const data = useParams();
  console.log(data);
  
  return (
    <div>ProductDetails</div>
  )
}
