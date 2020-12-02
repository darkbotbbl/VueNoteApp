// instantiating an new event bus to use
window.EventBus = new Vue();    // global event bus

const inputComponent = {
    template: `
        <input 
            :placeholder="placeholder"
            type="text" 
            class="input" 
            v-model="input"
            @keyup.enter="monitorEnterKey"
        />
    `,
    props: ['placeholder', ],
    data() {
        return {
            input: '',
        }
    },
    methods: {
        monitorEnterKey() {
            // this.$emit('add-note', {
            //     note: this.input,
            //     timestamp: new Date().toLocaleString(),
            // })
            EventBus.$emit('add-note', {
                note: this.input,
                timestamp: new Date().toLocaleString(),
            })
            this.input = '';
        }
    },
}

new Vue({
    el: "#app",
    data: {
        notes: [],
        timestamps: [],
        placeholder: "Enter a note, press enter to add.",
    },
    components: {
        "input-component": inputComponent,
    },
    methods: {
        addNote(event) {
            this.notes.push(event.note)
            this.timestamps.push(event.timestamp)
        }
    },
    created() {
        EventBus.$on('add-note', event => this.addNote(event));
    }
})