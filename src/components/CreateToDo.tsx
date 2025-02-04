import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = [
        { text: toDo, id: Date.now(), category: category },
        ...oldToDos,
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please wirte a To Do",
        })}
        placeholder="Write a to do"
        type="text"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
