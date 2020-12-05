// vuex store 
const state = {
    notes: [],
    timestamps: [],
}

const mutation = {
    ADD_NOTE() {

    },
    ADD_TIMESTAMP() {

    },
}

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
}

new Vue({
   
})