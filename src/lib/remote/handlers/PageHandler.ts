import type Context from '$lib/remote/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type { Selectable } from '$lib/remote'
import type EventHandler from './EventHandler'

export default class PageHandler<Row>
{
    public totalRows    : Writable<number>
    public pageNumber   : Writable<number>
    public rowCount     : Readable<{ total: number, start: number, end: number }>
    public rowsPerPage  : Writable<number | null>
    public events       : EventHandler
    public pages        : Readable<number[]>
    public selected     : Writable<Selectable<Row>[]>

    constructor(context: Context<Row>)
    {
        this.totalRows      = context.totalRows
        this.pageNumber     = context.pageNumber
        this.rowCount       = context.rowCount
        this.rowsPerPage    = context.rowsPerPage
        this.events         = context.events
        this.pages          = context.pages
        this.selected       = context.selected
    }

    public get()
    {
        return this.pages
    }

    public goto(number: number)
    {
        const rowsPerPage = get(this.rowsPerPage)
        const totalRows = get(this.totalRows)

        this.pageNumber.update((store) => {
            if (rowsPerPage && totalRows) {
                if (number >= 1 && number <= Math.ceil(totalRows / rowsPerPage)) {
                    store = number
                    this.events.trigger('change')
                }
                return store
            }
            else {
                if (number >= 1) {
                    store = number
                    this.events.trigger('change')
                }
                return store
            }
        })
        this.selected.set([])
    }

    public previous()
    {
        const number = get(this.pageNumber) - 1
        this.goto(number)
    }

    public next()
    {
        const number = get(this.pageNumber) + 1
        this.goto(number)
    }
}
