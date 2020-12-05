// vuex store 

// state
const state = {
    notes: [],
    timestamps: [],
}

// mutations
const mutations = {
    ADD_NOTE(state, payload) {
		state.notes.push(payload);
    },
    ADD_TIMESTAMP(state, payload) {
		state.timestamps.push(payload);
    },
}

// actions 
const actions = {
	addNote(context, payload) {
		context.commit('ADD_NOTE', payload);
	},
	addTimeStamp(context, payload) {
		context.commit('ADD_TIMESTAMP', payload);
	}
}

// getters
const getters = {
	getNotes: state => state.notes,
	getTimeStamps: state => state.timestamps,
	getNotesCount: state => state.notes.length,
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})


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
			this.$store.dispatch('addNote', this.input);
			this.$store.dispatch('addTimeStamp', new Date().toLocaleString());
			this.input = '';
        }
    },
}

// notes counter component
const notesCounterComponent = {
    template: ` <p>Number of Notes: <span>{{ number_of_notes }}</span></p>`,
	computed: {
		number_of_notes(){
			this.$store.getters.getNotesCount
		}
	}
}

new Vue({
	el: "#app",
	store,
	data: {
		placeholder: "Enter a Note!!!",
	},
	components: {
		inputComponent,
		notesCounterComponent,
	},
	computed: {
		notes() {
			return this.$store.getters.getNotes;
		},
		timestamps() {
			return this.$store.getters.getTimeStamps;
		}
	}
})