const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

export async function getJSON<T>(path: string): Promise<T>{
    const res = await fetch(`${BASE}${path}`, {cache: "no-store"})
    if (!res.ok){
       throw new Error(`API error ${res.status}`) 
    }

    return res.json() as Promise<T>
}