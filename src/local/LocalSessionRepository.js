export default class LocalSessionRepository  {
    constructor ( name) {
        this.name = name
        this.cache = []
    }

    getData () {
        const rawData = localStorage.getItem(this.name);
        if(!rawData) return [];
        return JSON.parse(rawData);
    }

    save () {
        if (this.cache.length === 0) return

        let list = this.getData()

        const ids = this.cache.map(e => e.id)
        list = [...list.filter(e => !ids.includes(e.id)), ...this.cache]

        localStorage.setItem(this.name, JSON.stringify(list))
    }

    dispose () {
        this.cache = []
    }

    create (entity) {
        this.cache.push(entity)
    }

    update (entity) {
        const old = this.cache.find(e => e.id === entity.id)
        if (old) {
            this.cache = this.cache.filter(e => e.id !== entity.id)
        }
        this.cache.push(entity)
    }

    getById (id) {
        let entity = this.cache.find(e => e.id === id)
        if (entity) return entity

        const list = this.getData()

        entity = list.find(e => e.id === id)
        if (entity) {
            this.cache.push(entity)
        }
        return entity
    }
}
