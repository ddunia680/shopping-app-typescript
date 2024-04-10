import { ItemsWrapper } from '../Components/itemsWrapper/itemsWrapper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { MainSkeleton } from '../ui/mainSkeleton';
import axios from '../../axios';
import { PULLWATCHES, SETPAGENUMBER, STARTPULLING, watchType } from '../store/watches';
import { NOTIFY } from '../store/errorUI';

export default function Home() {
  const watches = useAppSelector(state => state.watches.watches);
  const loading = useAppSelector(state => state.watches.loading);
  const nbrOfPages = useAppSelector(state => state.watches.NbrOfPages);
  const pageNumber = useAppSelector(state => state.watches.pageNumber);
  const dispatch = useAppDispatch();

  const pullNewPage = (i: number) => {
    dispatch(STARTPULLING());
    axios.get(`/pullWatches/?page=${i}&limit=5`)
    .then(res => {
      dispatch(PULLWATCHES({watches: res.data.watches as watchType[], nbrOfPages: res.data.nbrOfPages}));
      dispatch(SETPAGENUMBER(i));
    })
    .catch(err => {
      console.log(err);
      dispatch(NOTIFY({ message: err.response.data.message, isError: true }));
    })
  }

  const theButtons = [];
  for(let i = 1; i <= nbrOfPages; i++) {
    theButtons.push(
    <p key={i} className={['hover:bg-gray-700 hover:text-[#fff] rounded-full px-2 cursor-pointer', pageNumber === i ? 
    'bg-gray-700 text-[#fff]' : 'bg-gray-300'].join(' ')} onClick={() => pullNewPage(i)}>
      {i}
    </p>)
  }

  return (
    <div className="relative w-[100vw] h-[100%]">
      {!watches.length && loading ? <MainSkeleton /> : <ItemsWrapper />}
      <div className='md:absolute static md:bottom-1 md:z-10 md:left-[45%] mx-auto bg-white shadow flex justify-center md:justify-around 
      items-center gap-[0.5rem] px-1 py-[0.1rem] rounded-full'>
            { theButtons }
      </div>
    </div>
  )
}
