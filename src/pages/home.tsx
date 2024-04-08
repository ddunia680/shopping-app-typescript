import { ItemsWrapper } from '../Components/itemsWrapper/itemsWrapper';
import { useAppSelector } from '../store/hooks';
import { MainSkeleton } from '../ui/mainSkeleton';

export default function Home() {
  const watches = useAppSelector(state => state.watches.watches);
  const loading = useAppSelector(state => state.watches.loading);

  return (
    <div className="relative w-[100vw] h-[100%]">
      {!watches.length && loading ? <MainSkeleton /> : <ItemsWrapper />}
    </div>
  )
}
