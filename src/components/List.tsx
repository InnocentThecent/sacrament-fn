import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

type ListProps<T extends { toString(): string }> = {
  items: T[];
  selectedItem: T;
  onChange: (item: T) => void;
  label: string;
  required?: boolean;
};

function List<T extends { toString(): string }>({
  items,
  selectedItem,
  onChange,
  label,
  required,
}: ListProps<T>) {
  const { t } = useTranslation();
  return (
    <Listbox value={selectedItem} onChange={onChange}>
      <div className="relative mt-1 z-50">
        <label htmlFor="" className="font-semibold">
          {t(label)}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <Listbox.Button className="mt-1 relative w-full border cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
          <span className="block truncate">
            {selectedItem
              ? selectedItem?.toString()
              : `${t("Select")}  ${label.toLowerCase()}`}
          </span>
          <span className="pointer-events-none cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5  text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            {items.map((item, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary text-white" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item?.toString()}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary hover:text-white">
                        <CheckIcon
                          className="h-5 w-5 hover:text-white"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default List;
