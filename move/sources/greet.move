module tahlil::test {
    use std::signer;
    use std::string::{String, Self};

    struct Greeting has key {
        greeting: String
    }

    fun init_module(deployer: &signer) {
        move_to(deployer, Greeting{
            greeting: string::utf8(b"Hello World")
        });
    }

    public fun update_greeting(account: &signer, new_greeting: String) acquires Greeting {
        let greet = borrow_global_mut<Greeting>(signer::address_of(account));
        greet.greeting = new_greeting;
    }

}