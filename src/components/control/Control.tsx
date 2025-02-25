import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setTool } from '../../store/slices/toolSlice';
import { Tool } from '../../types/canvas';
import './Control.scss';

export const Control: FC = () => {
  const dispatch = useAppDispatch();
  const currentTool = useAppSelector((state) => state.tool.currentTool);

  const handleToolChange = (tool: Tool) => {
    dispatch(setTool(tool));
  };

  return (
    <div className="control">
      <div className="control__group">
        <button
          className={`control__button ${currentTool === 'cursor' ? 'control__button--active' : ''}`}
          onClick={() => handleToolChange('cursor')}
        >
          <span className="control__icon">🖱️</span>
          <span className="control__label">Взаимодействие</span>
        </button>

        <button
          className={`control__button ${currentTool === 'shape' ? 'control__button--active' : ''}`}
          onClick={() => handleToolChange('shape')}
        >
          <span className="control__icon">➕</span>
          <span className="control__label">Добавление</span>
        </button>
      </div>
    </div>
  );
};
