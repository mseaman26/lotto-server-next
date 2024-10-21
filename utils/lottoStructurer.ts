import type { LottoStructure } from "@/utils/interfaces"
export interface LottoNumber{
    setIndex: number
    color: string
}

export type LottoSet = [number, number]

export const lottoStructurer = (lotto: string) => {

    let structure: LottoStructure = {
        title: '',
        numbers: [],
        sets: [],
        days: []
    }

    if(lotto === 'powerball'){
        structure = {
            title: 'Powerball',
            sets: [
                [1, 69],
                [1, 26]
            ],
            numbers: [
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'red', setIndex: 1}
            ],
            days: [1, 3, 6]
            
        }
    }else if(lotto === 'megamillions'){
        structure = {
            title: 'Mega Millions',
            sets: [
                [1, 70],
                [1, 25]
            ],
            numbers: [
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'gold', setIndex: 1}
            ],
            days: [2, 5]
        }
    }

    return structure
}

export const weekdaysString = (days: number[]) => {
    let weekdays = ''
    for(let i = 0; i < days.length; i++){
        weekdays += days[i] === 7 ? 'Sunday, ' : days[i] === 1 ? 'Monday, ' : days[i] === 2 ? 'Tuesday, ' : days[i] === 3 ? 'Wednesday, ' : days[i] === 4 ? 'Thursday, ' : days[i] === 5 ? 'Friday, ' : 'Saturday, '
        if(i !== days.length - 1){
            weekdays += 'or '
        }
    }
    return weekdays
}