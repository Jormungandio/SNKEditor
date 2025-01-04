import Database from '@tauri-apps/plugin-sql';


export interface Notes {
    id: string
    name: string,
    text: string,
    created_at: string,
    updated_at: string,
    tag: string,
    folder_id: string,
}

const db = await Database.load("sqlite:snkbase.db");

export async function AddData(name: string, text: string, tag: string){
    
    await db.execute(
        "INSERT into note (name, text, tag) VALUES ($1, $2, $3)",
        [name, text, tag],
    );

}

export async function ViewData(name: string): Promise<Notes[]> {
  
    const result = await db.select<Notes[]>(
      "SELECT * FROM note WHERE name = ?",
      [name]
    );
  
    return result;
}

export async function UpdateData(id: string, name: string, text: string, tag: string, folder: string) {

    await db.select<Notes[]>(
        `UPDATE note SET name='$2', "text"='$3', tag='$4', folder_id=$5 WHERE id = $1`,
        [id, name, text, tag, folder]
    );
    
}


