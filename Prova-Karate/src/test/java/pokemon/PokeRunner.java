package pokemon;
import com.intuit.karate.junit5.Karate;

class PokerRunner {

    @Karate.Test
    Karate testPokemon() {
        return Karate.run("pokemon").relativeTo(getClass());
    }

}