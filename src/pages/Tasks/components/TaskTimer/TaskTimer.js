import { editTask } from "../../../../store/TasksSlice";
import { useDispatch } from "react-redux";
// import { TasksContext } from "../../../Contexts/TasksContext";
import useTimeParser from "../../../../Hooks/useTimeParser";
import useTimer from "../../../../Hooks/useTimer";
import Button from "../../../../Components/UI/Button/Button";
import style from "./TaskTimer.module.css";
import { useContext, useEffect } from "react";

const TaskTimer = ({ index, onCloseModal }) => {

    const { time, startTimer, stopTimer } = useTimer();
    const { parseSecondsToHMS } = useTimeParser();

    //const { editTask } = useContext(TasksContext);    --> gestion des tasks avec le context
    const dispatch = useDispatch();                 //  --> gestion des tasks avec Redux

    useEffect(() => {
        startTimer();

        return () => {
            stopTimer();
        }
    }, []);

    const handleStopTimer = () => {
        const savedTime = stopTimer();
        dispatch(editTask({ taskIndex: index, task: {time: savedTime }}));
        onCloseModal();
    }

    return (
        <div className={ style['timer-container'] }>
            <p className={ style.timer }>{ parseSecondsToHMS(time) }</p>
            <Button onClick={ handleStopTimer }>Stop</Button>
        </div>
    )

};

export default TaskTimer;