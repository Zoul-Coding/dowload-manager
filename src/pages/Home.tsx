import FoldersView from "./components/FoldersView"
import DragAndDropZone from "./components/DragAndDropZone"

function Home() {
  return (
    <div className="max-w-screen-sm mx-auto h-screen flex flex-col justify-center px-8">
    <FoldersView />
    <DragAndDropZone />
    </div>
  )
}

export default Home