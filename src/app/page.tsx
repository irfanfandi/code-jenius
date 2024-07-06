"use client";
import Button from "@/components/Button";
import ReLoading from "@/components/ReLoading";
import useGetData from "@/hooks/contact";
import { RootState } from "@/store";
import { setIsLoading } from "@/store/generalSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noimage from "../../public/no-image.png";

export default function Home() {
  const { isLoading } = useSelector((state: RootState) => state.general);
  const { dataContacts, refetchContact } = useGetData();
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteData = async (id: string) => {
    dispatch(setIsLoading(true));
    try {
      const ress = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        }
      );
      if (ress.ok) {
        alert("Success delete data");
        refetchContact();
        return;
      }
      alert("Failed delete data");
    } catch (error) {
      alert("Failed delete data");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h6 className="text-xl font-bold">Contacts</h6>
        <div className="space-x-2">
          <Button
            color={"bg-purple-500"}
            id="add-button"
            title={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            }
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      </div>
      <section className="container mt-4">
        {dataContacts.length > 0 &&
          dataContacts.map((e: any) => {
            return (
              <div
                key={e.id}
                className="flex gap-4 mt-2  items-center bg-white w-full p-4 rounded-xl"
              >
                <div className="w-1/12">
                  <Image
                    src={
                      new RegExp("^(https?:\\/\\/)?").test(e.photo)
                        ? noimage
                        : e.photo
                    }
                    width={60}
                    height={60}
                    alt={e.firstName}
                    className="w-14 h-14 rounded-full"
                  />
                </div>
                <div className="w-3/12">
                  <h6 className="text-gray-500">First name</h6>
                  <p>{e.firstName}</p>
                </div>
                <div className="w-3/12">
                  <h6 className="text-gray-500">Last name</h6>
                  <p>{e.lastName}</p>
                </div>
                <div className="w-3/12">
                  <h6 className="text-gray-500">Age</h6>
                  <p>{e.age}</p>
                </div>
                <div className="w-1/12 lg:space-x-2 space-y-2 items-center">
                  <Button
                    id={`edit-button-${e.firstName}`}
                    color={"bg-gray-500"}
                    onClick={() => {
                      setSelectedData(e);
                      setShowModal(true);
                    }}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    }
                  />
                  <Button
                    id={`delete-button-${e.firstName}`}
                    color={"bg-red-500"}
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete the data?")
                      ) {
                        handleDeleteData(e.id);
                      }
                    }}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            );
          })}
      </section>
      {showModal && (
        <ModalFormAddUpdate
          selectedData={selectedData}
          onClose={() => {
            setShowModal(false);
            setSelectedData(null);
          }}
          refetchContact={() => {
            refetchContact();
          }}
        />
      )}
      {isLoading && <ReLoading />}
    </>
  );
}

type TformData = {
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

const initialValues: TformData = {
  firstName: "",
  lastName: "",
  age: 0,
  photo:
    "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
};

const ModalFormAddUpdate = ({
  selectedData,
  onClose,
  refetchContact,
}: {
  onClose: () => void;
  refetchContact: () => void;
  selectedData: any | null;
}) => {
  const dispatch = useDispatch();
  const [formData, setformData] = useState<TformData>(initialValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const createContact = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  const updateContact = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${selectedData.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(formData),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const ress = selectedData?.id
        ? await updateContact()
        : await createContact();

      if (ress.ok) {
        onClose();
        refetchContact();
        return;
      }
      alert("Failed save data");
    } catch (error) {
      alert("Failed save data");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (selectedData) {
      const { firstName, lastName, age, photo } = selectedData;
      setformData({
        firstName,
        lastName,
        age,
        photo,
      });
    }
  }, [selectedData]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl font-semibold">
                {selectedData?.id ? "Edit Contact" : "Add Contact"}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form
                id="form-todo"
                className="space-y-6 relative py-6 mx-auto flex-auto"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <input
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  name="firstName"
                  className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB]"
                  placeholder="First Name"
                />
                <input
                  value={formData.lastName}
                  required
                  onChange={handleInputChange}
                  name="lastName"
                  className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB]"
                  placeholder="Last Name"
                />
                <input
                  value={formData.age}
                  required
                  type="number"
                  min={10}
                  max={150}
                  onChange={handleInputChange}
                  name="age"
                  className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB]"
                  placeholder="Age"
                />
                <input
                  value={formData.photo}
                  onChange={handleInputChange}
                  required
                  name="photo"
                  type="url"
                  className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB]"
                  placeholder="Phot0"
                />
              </form>
              <div className="flex-col items-center justify-center space-y-4 mt-6">
                <Button
                  id="submit-button"
                  form="form-todo"
                  color={"bg-purple-500 w-full"}
                  title={"Simpan"}
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
