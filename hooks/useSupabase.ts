import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { createclientsupabase } from "../lib/supabase";


export default function useSupabase() {
    const { getToken } = useAuth() //this function is used to get the jwt token of the user or bearer token
    const client = useMemo(
        () => createclientsupabase(() => getToken())
        , [getToken])
    return client;
}