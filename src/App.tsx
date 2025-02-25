import { FC } from 'react';
import { Canvas } from './components/canvas/Canvas.tsx';
import { Control } from './components/control/Control.tsx';
// import { TextEditor } from './components/textEditor/TextEditor.tsx';
import { useAppSelector } from './hooks/redux.ts';
import './styles/App.scss';

const App: FC = () => {
  const isEditing = useAppSelector((state) => state.tool.isEditing);

  return (
    <div className="app">
      <Canvas />
      <Control />
      {/* {isEditing && <TextEditor />} */}
    </div>
  );
};

export default App;
