import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IProps } from "../../types";
import { fetchApiData } from "../../redux/features";
import { toast } from "react-toastify";

export default function CalculateOfferings({ isOpen, onClose }: IProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);
  const [years, setYears] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    if (years <= 0 || years > 75) {
      toast.error("Years should be between 0 and 75");
    }
    const parishInfo = data?.parishInfo[0];
    setAmount(years * parishInfo?.offeringAmount);
  };

  useEffect(() => {
    dispatch(fetchApiData("/users/parishInfo"));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Calculate Offerings"
      onSubmit={handleSubmit}
      submitText="Calculate"
    >
      <div className="flex justify-around">
        <Input
          labelFor="years"
          labelText="Years"
          type="number"
          isRequired={true}
          placeholder="Enter Number of years"
          id="years"
          name="years"
          handleChange={(e) => setYears(e.target.value as unknown as number)}
          defaultValue={0}
        />
        <div className={` ${amount !== 0 ? "flex flex-col" : "hidden"}`}>
          <label htmlFor="">
            <h3 className={`font-semibold text-lg`}>Offering Amount </h3>
          </label>
          <label className="text-lg">
            {amount} Rwf
          </label>
        </div>
      </div>
    </Modal>
  );
}
