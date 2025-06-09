import { useEffect, useState } from "react";

import { useTitle } from "../../hooks/useTitle";

import { DashbaordCard } from "./components/DashboardCard";
import { DashbaordEmpty } from "./components/DashboardEmpty";
import { getUserOrders } from "../../services/dataService";
import { toast } from "react-toastify";


export const DashboardPage = () => {  
  const [orderLists, setOrderLists] = useState([]);
  useTitle("Dashboard");

  useEffect(() => {
    async function fetchOrders() {      
      try {
        const data = await getUserOrders();
        setOrderLists(data);
      } catch(error) {
        toast.error(error.message);
      }
    }

    fetchOrders();
  }, []);

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
      </section>

      { orderLists.length && orderLists.map((order) => (
        <DashbaordCard key={order.id} order={order} />
      )) }

      { !orderLists.length && <DashbaordEmpty /> }
    </main>
  )
}