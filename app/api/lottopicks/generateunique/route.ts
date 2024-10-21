import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/mongodb";
import { lottoStructurer } from "@/utils/lottoStructurer";
import type { LottoStructure } from "@/utils/interfaces";
import { setCorsHeaders } from "@/utils/helpers";



export async function POST(request) {
    await connectMongoDB();
    console.log("Generating unique lotto pick");
    const body = await request.json();
    const { gameName, drawDate } = body;
    const structure = lottoStructurer(gameName);
    const { sets: structureSets } = structure;


    function createNumberSet(low: number, high: number): Set<number> {
        const numberSet = new Set<number>();
    
        for (let i = low; i <= high; i++) {
            numberSet.add(i);
        }
    
        return numberSet;
    }

    const initializeSets = () => {
        const sets: Set<number>[] = [];
        for (let i = 0; i < structureSets.length; i++) {
            const [low, high] = structureSets[i];
            sets.push(createNumberSet(low, high));
        }
        return sets
    }

    const generateUniquePick = () => {
        const sets: Set<number>[] = initializeSets();
        const numbers: number[] = [];
        for (let i = 0; i < structure.numbers.length; i++) {
            const setIndex = structure.numbers[i].setIndex;
            console.log('setIndex', setIndex);
            const randomIndex = Math.floor(Math.random() * sets[setIndex].size);
            console.log('randomIndex', randomIndex);
            const number = Array.from(sets[setIndex])[randomIndex];
            numbers.push(number);
            sets[setIndex].delete(number);
        }
        return sortNumbersBySet(numbers, structure);
       
    }

    const sortNumbersBySet = (numbers: number[], lottoStructure: LottoStructure ): number[] => {
        console.log('numbers', numbers);
        const finalNumbers: number[][] = [];
        for(let i = 0; i < lottoStructure.sets.length; i++){
            finalNumbers.push([]);
        }
        for(let i = 0; i < numbers.length; i++){
            finalNumbers[lottoStructure.numbers[i].setIndex].push(numbers[i]);
        }
        for(let i = 0; i < finalNumbers.length; i++){
            finalNumbers[i].sort((a, b) => a - b);
        }
        const flattened = finalNumbers.flat();
        return flattened;
    }

    try {
        const existingPicks = await LottoPick.find({ gameName, drawDate });
        //generate new pick that is random and uniqe
        let numbers = generateUniquePick(); //returns sorted numbers
        //make sure numbers are unique and if not, generate new numbers
        let tries = 1;
        while (existingPicks.some((pick) => pick.numbers.every((number, index) => number === numbers[index]))) {
            tries++;
            numbers = generateUniquePick();
        }

        return NextResponse.json({ success: true, data: numbers, tries: tries }, { status: 201, headers: setCorsHeaders() });
        

    } catch (error) {
        console.log("Error checking uniqueness: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders() });
    }
}