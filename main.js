// instantiating an new event bus to use
const EventBus = new Vue();    // global event bus

// event component
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

// notes counter component
const notesCounterComponent = {
    template: ` <p>Number of Notes: <span>{{ number_of_notes }}</span></p>`,
    data() {
        return {
            number_of_notes: 0,
        }
    },
    created() {
        EventBus.$on('add-note', e => this.number_of_notes++);
    }
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
        "notes-counter-component": notesCounterComponent,
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