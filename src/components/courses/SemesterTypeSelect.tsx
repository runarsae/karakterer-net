import { useContext } from "@/utils/useContext";
import {
  SemesterType,
  SemesterTypeContext,
  semesterTypeLabels,
} from "./SemesterTypeContextProvider";
import { ChangeEvent } from "react";
import RadioButton from "../common/RadioButton";

export default function SemesterTypeSelect() {
  const {
    selectedSemesterType,
    setSelectedSemesterType,
    enabledSemesterTypes,
  } = useContext(SemesterTypeContext);

  const onRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedSemesterType(e.target.value as unknown as SemesterType);
  };

  return (
    <div className="flex flex-col gap-3">
      <RadioButton
        disabled={!enabledSemesterTypes.includes(SemesterType.All)}
        group="semester"
        label={semesterTypeLabels[SemesterType.All]}
        value={SemesterType.All.toString()}
        checked={selectedSemesterType == SemesterType.All}
        onChange={onRadioButtonChange}
      />
      <RadioButton
        disabled={!enabledSemesterTypes.includes(SemesterType.Autumn)}
        group="semester"
        label="Kun høst"
        value={SemesterType.Autumn.toString()}
        checked={selectedSemesterType == SemesterType.Autumn}
        onChange={onRadioButtonChange}
      />
      <RadioButton
        disabled={!enabledSemesterTypes.includes(SemesterType.Spring)}
        group="semester"
        label="Kun vår"
        value={SemesterType.Spring.toString()}
        checked={selectedSemesterType == SemesterType.Spring}
        onChange={onRadioButtonChange}
      />
    </div>
  );
}
