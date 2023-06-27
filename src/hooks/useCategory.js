import axios from "axios";
import { useEffect, useState } from "react";


export default function useCategory() {
    const [categories, setCategory] = useState([])

    //get category
    const getCategory = async () => {
        try {
            const { data } = await axios.get('https://ecomnode.onrender.com/api/v1/category')
            setCategory(data?.categories)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getCategory()
    }, [])
    return categories
}