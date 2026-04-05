import { useUsers } from "@/hooks/useUsers";

const Users = () => {

const {data} = useUsers();

console.log("user data", data);


  return <div>Manage Users Here: Total: {data?.data?.length}</div>;
};

export default Users;