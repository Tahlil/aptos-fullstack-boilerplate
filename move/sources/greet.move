module tahlil::test {
    use std::option;
    use std::string::{Self, String};
    use std::signer;
    use std::debug;

    use aptos_framework::object::{Self, Object};

    use aptos_token_objects::collection;
    use aptos_token_objects::token;

    use aptos_std::smart_vector::{Self, SmartVector};

    const ENOT_ADMIN: u64 = 1;
    const ENOT_EVENT_MANAGER: u64 = 2;
    const ENOT_OWNER: u64 = 3;

    struct Config has key {
        whitelist: SmartVector<address>, // Whitelisting event managers
        extend_ref: object::ExtendRef, /// `extend_ref` of the event manager object. Used to obtain its signer.
    }

    

    struct Greeting has key {
        greeting: String
    }

    fun init_module(deployer: &signer) {
        move_to(deployer, Greeting{
            greeting: string::utf8(b"Hello World")
        });
    }

    public entry fun update_greeting(account: &signer, new_greeting: String) acquires Greeting {
        let greet = borrow_global_mut<Greeting>(signer::address_of(account));
        greet.greeting = new_greeting;
    }

}