import { FC } from 'react';
import { Canvas } from '@/components/Canvas/Canvas';
import { Control } from '@/components/Control/Control';
import { TextEditor } from '@components/TextEditor/TextEditor';
import { useAppSelector } from '@/hooks/redux';
import '@/styles/App.scss';

const App: FC = () => {
  const isEditing = useAppSelector((state) => state.tool.isEditing);

  return (
    <div className="app">
      <Canvas />
      <Control />
      {isEditing && <TextEditor />}
    </div>
  );
};

export default App;
