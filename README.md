# EventHub

This is largely based off a waking dream where I feverishly thought through an entire application built on webcomponents which needed to have a way of modifying some kind of shared state and also be aware of the changes to other components. Though this idea could be implemented using basic browser events, there is a gaping hole in terms of providing visibility and easy debugging with custom browser events.

I can't remember the whole dream (I was too tired to get up and write code, and too wired to sleep), so I'm missing a few of the 'Aha!' moments that must have happened in my insomniatic state, but the idea for now is to provide a registration system in a central location where componenents (web/webworkers/functions/whatever) can register listeners and trigger events.

I'm really hoping that this doesn't just turn into Redux-Lite, but if it does, at least I'll know I had something worth keeping.
