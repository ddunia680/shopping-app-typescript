import { Key, useEffect, useState } from 'react'
import axios from '../../../axios';
import { HiCheckBadge } from "react-icons/hi2";
import PulseLoader from 'react-spinners/PulseLoader';
import OrderVerifcationSkeleton from '../../ui/orderVerifcationSkeleton';
import OrderSearchItem from '../OrderSearchItem/orderSearchItem';
import OrderSearchItmSkeleton from '../../ui/orderSearchItmSkeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NOTIFY } from '../../store/errorUI';
const yearMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

interface myOrderTypes {
    _id: string,
    createdAt: Date,
    delivered: boolean,
    customer: { _id: string, email: string, username: string,  },
    items: {count: number, _id: string,  watch: { _id: string, description: string, imageURL: string, name: string, previousPrice: number, price: number }}[],
    totalAmount: number,

}

export default function Orders() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const [enteredvalue, setEnteredValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const selectedOrderId = useAppSelector(state => state.order.orderSelected);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedOrder, setSelectedOrder] = useState<myOrderTypes | any>({});
    

    useEffect(() => {
        if(selectedOrderId) {
            setEnteredValue('');
            axios.get(`admin/pullAnOrder/${selectedOrderId}`, { headers: { Authorization: 'Bearer '+ token } })
            .then(res => {
                setSelectedOrder(res.data.order);
            })
            .catch(err => {
                console.log(err);
                dispatch(NOTIFY({message: err.response.data.message, isError: true}))
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrderId]);


    const searchOrders = (value: string) => {
        axios.get(`admin/searchOrder/${value}`, { headers: { Authorization: 'Bearer '+ token } })
        .then(res => {
            setSearchResults(res.data.orders)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deliveredOrder = () => {
        setLoading(true);
        axios.get(`admin/deliveredOrder/${selectedOrderId}`, { headers: { Authorization: 'Bearer '+ token } })
        .then(res => {
            setLoading(false);
            setSelectedOrder(res.data.order)
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            dispatch(NOTIFY({message: err.response.data.message, isError: true}))
        })
    }

  return (
    <div className="relative w-full pt-[5rem] md:pt-[7rem] flex flex-col justify-start items-center pb-[2rem] gap-[0rem] md:gap-[2rem]">
        <h2 className='text-[18px] tracking-wide font-bold pt-[1rem]'>Search For an Order </h2>
        <div className='relative w-full flex flex-col justify-start items-center'>
            <input type='text' className='my-[1rem] w-[80%] md:w-[40%] h-[2rem] md:h-[3rem] rounded-lg px-[1rem] bg-gray-300 border-[2px]
             border-blue-400 focus:outline-1 focus:outline-gray-400' value={enteredvalue} placeholder='Enter order id' onChange={e => {
                setEnteredValue(e.target.value);
                searchOrders(e.target.value);
            }}/>
            { enteredvalue && 
            <div className='absolute top-[3rem] md:top-[4rem] bg-white w-[80%] md:w-[40%] rounded-lg flex flex-col 
            justify-start items-center gap-1 z-[10000] shadow-sm shadow-black'>
                {searchResults.length && enteredvalue ? searchResults.map((el: myOrderTypes) => (
                    <OrderSearchItem key={el._id} id={el._id} pic={el.items[0].watch.imageURL} username={el.customer.username} delivered={el.delivered} date={el.createdAt} />
                ))
                : !searchResults.length && enteredvalue ? <OrderSearchItmSkeleton /> : null }
            </div>}
        </div>
        { !Object.keys(selectedOrder).length ? <OrderVerifcationSkeleton /> : 
        <div className='w-[95%] md:w-[70%] bg-white flex flex-col md:flex-row justify-start items-start md:items-center p-[1rem]'>
                <div className='flex justify-between items-center w-full md:w-[60%] xl:w-[50%] border-[1px] border-gray-300 rounded-lg pr-[1rem]'>
                    <div className='relative w-[60%] flex justify-between items-center'>
                        <div className='w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full bg-gray-300 border-[5px] border-white 
                        z-[1000] overflow-hidden flex justify-center items-center'>
                            <img src={selectedOrder.items[0].watch.imageURL} className='w-[90%] h-[90%] object-contain'/>
                        </div>
                        { selectedOrder.items[1] && <div className='absolute w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full bg-gray-300 border-[5px] 
                        border-white left-[3rem] md:left-[5rem] z-[100] overflow-hidden flex justify-center items-center'>
                            <img src={selectedOrder.items[1].watch.imageURL} className='w-[90%] h-[90%] object-contain'/>
                        </div>}
                        { selectedOrder.items[2] && <div className='absolute w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] rounded-full bg-gray-300 border-[5px] 
                        border-white left-[6rem] md:left-[10rem] z-[10] overflow-hidden flex justify-center items-center' >
                            <img src={selectedOrder.items[2].watch.imageURL} className='w-[90%] h-[90%] object-contain'/>
                        </div>}
                    </div>
                    {selectedOrder.items.length > 3 && <p className='font-semibold'>and {selectedOrder.items.length - 3} more</p>}
                </div>
                <div className='flex flex-col justify-start items-center gap-[1rem] p-[1rem] w-full md:w-[40%] xl:w-[50%]'>
                    <h3 className='bg-[#8fade4] px-[1rem] py-[0.3rem] font-semibold text-[12px] md:text-[15px]'>
                        For: {selectedOrder.customer.username} --- Date: {new Date(selectedOrder.createdAt).getDate()} {yearMonths[new Date(selectedOrder.createdAt).getMonth()]} {new Date(selectedOrder.createdAt).getFullYear()}</h3>
                    <p className='text-[11px] md:text-[13px]' title={selectedOrder._id}><span className='font-semibold'>
                        Transaction Id:</span> {selectedOrder._id.substring(0, 30).concat('...')}
                    </p>
                    <div className='w-[100%] flex flex-col justify-start items-center gap-[1rem] h-[6rem] md:h-[8rem] border-b-[2px] border-gray-400 overflow-y-auto'>
                        { selectedOrder.items.map((ordr: { _id: Key | null | undefined; watch: { name: string ; price: number; }; count: number }) => (
                            <div key={ordr._id} className='flex justify-start items-center' title={ordr.watch.name}>
                                <p className='border-[1px] border-gray-400 px-[0.5rem] text-[13px] md:text-[14px] rounded-md'>{ordr.watch.name.substring(0, 12).concat('...')}</p>
                                <hr className='w-[1rem] bg-gray-400 h-[3px]'/>
                                <p className='border-[1px] border-gray-400 px-[0.5rem] text-[13px] md:text-[14px] rounded-md'>{ordr.count} {ordr.count > 1 ? 'pieces' : 'piece'}</p>
                                <hr className='w-[1rem] bg-gray-400 h-[3px]'/>
                                <p className='border-[1px] border-gray-400 px-[0.5rem] text-[13px] md:text-[14px] rounded-md'>{ordr.count * ordr.watch.price} $</p>
                            </div>
                        ))}
                    </div>
                    <div className='w-full flex justify-center items-center gap-[2rem]'>
                        <h3 className='font-semibold text-[14px] md:text-[15px]'>Total Amount: <span className='text-blue-800 font-bold'>{selectedOrder.totalAmount} $</span></h3>
                        { selectedOrder.delivered && <p className='flex justify-start items-center font-semibold text-[14px] md:text-[15px]'>Delivered <HiCheckBadge className='text-[25px] text-blue-700'/></p>}
                    </div>
                    { !selectedOrder.delivered && <button className='py-[0.3rem] bg-blue-700 hover:bg-blue-800 text-white w-[100%] md:w-[70%] rounded-lg shadow-sm shadow-black 
                    text-[14px] md:text-[15px] flex justify-center items-end cursor-pointer' onClick={() => deliveredOrder()}>
                        <span>Confirm Delivery?</span>
                        { loading && <PulseLoader 
                            color={"#ffff"}
                            loading={true}
                            size={3}
                        />}
                    </button>}
                </div>
        </div>}
    </div>
  )
}
