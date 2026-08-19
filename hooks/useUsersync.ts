import { useUser } from "@clerk/expo";
import { useEffect } from "react";
import { useUserStore } from "../store/userStor";
import useSupabase from "./useSupabase";

export function useUsersync() {
    const { user } = useUser() //this function basically is used for know is the user is login or not

    const setisadmin = useUserStore((state) => state.setadmin) //fetching the admin status
    const client = useSupabase()

    useEffect(() => {
        if (!user) return
        syncUser()
    }, [user])

    const syncUser = async () => {
        try {
            // 1. Try to fetch the data
            const { data, error } = await client
                .from("users")
                .select("clerk_id,is_admin")
                .eq("clerk_id", user!.id)
                .maybeSingle();

            // Supabase sometimes returns errors in the 'error' object without throwing!
            if (error) {
                console.error("Supabase Error:", error.message);
                return;
            }

            // 2. If we found data, set the admin status
            if (data) {
                setisadmin(data.is_admin ?? false);
                return;
            }
            const { data: newUser, error: insertError } = await client.from("users")
                .insert({
                    clerk_id: user!.id,
                    email: user?.emailAddresses[0].emailAddress,
                    first_name: user?.firstName,
                    last_name: user?.lastName,
                    avatar_url: user?.imageUrl,

                })
                .select("is_admin")
                .single();

            if (insertError) {
                console.error("Failed to insert user:", insertError);
                return;
            }

            setisadmin(newUser?.is_admin ?? false)
        } catch (err) {
            // 3. Catch network crashes, timeouts, etc.
            console.error("Failed to sync user:", err);
        }
    }


}