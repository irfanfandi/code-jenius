"use client";
import { setIsLoading } from "@/store/generalSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGetData() {
  const dispatch = useDispatch();
  const [dataContacts, setdataContacts] = useState([]);

  const getData = async () => {
    try {
      dispatch(setIsLoading(true));
      const ress = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}`);
      if (ress.ok) {
        const { data } = await ress.json();
        setdataContacts(data);
      }
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const refetchContact = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return { dataContacts, refetchContact };
}
