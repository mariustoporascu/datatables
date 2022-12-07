import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/datatables'
    const page = 'sticky'
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'Th.svelte',
                        code: fs.readFileSync(`${path}/Th.svelte`).toString('utf-8'),
                    },
                    {
                        name: 'ThFilter.svelte',
                        code: fs.readFileSync(`${path}/ThFilter.svelte`).toString('utf-8'),
                    },
                    {
                        name: 'Datatable.svelte',
                        code: fs.readFileSync(`${path}/${page}/Datatable.svelte`).toString('utf-8'),
                        components: [
                            {
                                name: 'Search.svelte',
                                code: fs.readFileSync(`${path}/Search.svelte`).toString('utf-8'),
                            },
                            {
                                name: 'RowsPerPage.svelte',
                                code: fs.readFileSync(`${path}/RowsPerPage.svelte`).toString('utf-8'),
                            },
                            {
                                name: 'RowCount.svelte',
                                code: fs.readFileSync(`${path}/RowCount.svelte`).toString('utf-8'),
                            },
                            {
                                name: 'Pagination.svelte',
                                code: fs.readFileSync(`${path}/Pagination.svelte`).toString('utf-8'),
                            }
                        ]
                    },
                ]
            },

        ]
    }
}