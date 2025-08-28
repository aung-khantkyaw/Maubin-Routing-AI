"use client"
import React from 'react'
import RoadForm from '@/components/admin/road-from'
import { postRoads } from '@/lib/admin/roads'


function Create() {
    const defaultRoad = {
        burmese_name: "",
        english_name: "",
        coordinates: [],
        length_m: "0",
        road_type: "local",
        is_oneway: false,
    }

    return (
        <RoadForm onSubmit={postRoads} type={"CREATE"} defaultRoads={defaultRoad} />
    )
}

export default Create