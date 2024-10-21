interface StructureNumber{
    color: string,
    setIndex: number    
}

export interface LottoStructure{
    title: string,
    numbers: StructureNumber[],
    sets: ([number, number])[],
    days: number[]
}