package com.task.trello.rest;

import com.task.trello.dto.UserDto;
import com.task.trello.models.Card;
import com.task.trello.models.CardTask;
import com.task.trello.models.User;
import com.task.trello.services.CardService;
import com.task.trello.services.UserDataService;
import com.task.trello.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainController {

    private final CardService cardService;
    private final UserService userService;
    private final UserDataService userDataService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MainController(CardService cardService, UserService userService, UserDataService userDataService, PasswordEncoder passwordEncoder) {
        this.cardService = cardService;
        this.userService = userService;
        this.userDataService = userDataService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/cards")
    public ResponseEntity<?> getAllCards() {
        List<Card> cards = cardService.getAllCards();
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping("/cards")
    public ResponseEntity<?> addCard(@RequestBody Card card) {
        Card result = cardService.addCard(card);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/cards/{cardId}")
    public ResponseEntity<?> deleteCard(@PathVariable(name = "cardId") Long id) {
        Card result = cardService.getCardById(id);
        List<CardTask> cardTasks = cardService.getAllCardsTasksOfCard(result);
        for (CardTask cardTask : cardTasks) {
            cardService.deleteCardTaskById(cardTask.getId());
        }
        result = cardService.deleteCardById(id);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/cards/{cardId}")
    public ResponseEntity<?> updateCard(@PathVariable(name = "cardId") Long id, @RequestBody Card card) {
        if (cardService.getCardById(id) == null) {
            return ResponseEntity.badRequest().build();
        }
        Card result = cardService.editCard(card);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/cards/{cardId}")
    public ResponseEntity<?> getCardDetails(@PathVariable(name = "cardId") Long id) {
        Card result = cardService.getCardById(id);
        if (result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/card-tasks/{cardId}")
    public ResponseEntity<?> addCardTask(@PathVariable(name = "cardId") Long cardId,
                                         @RequestBody CardTask cardTask) {
        cardTask.setCard(cardService.getCardById(cardId));
        CardTask result = cardService.addCardTask(cardTask);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/card-tasks/{cardId}")
    public ResponseEntity<?> getCardTasks(@PathVariable(name = "cardId") Long cardId) {
        Card card = cardService.getCardById(cardId);
        if (card != null) {
            List<CardTask> cardTasks = cardService.getAllCardsTasksOfCard(card);
            return new ResponseEntity<>(cardTasks, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/card-tasks/{cardTaskId}")
    public ResponseEntity<?> updateCardTask(@PathVariable(name = "cardTaskId") Long id,
                                            @RequestBody CardTask cardTask) {
        CardTask task = cardService.getCardTaskById(id);
        if (task == null) {
            return ResponseEntity.badRequest().build();
        }
        cardTask.setCard(task.getCard());
        CardTask result = cardService.editCardTask(cardTask);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/card-tasks/{cardTaskId}")
    public ResponseEntity<?> deleteCardTask(@PathVariable(name = "cardTaskId") Long id) {
        CardTask result = cardService.deleteCardTaskById(id);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/search-cards/{text}")
    public ResponseEntity<?> getSearchedCards(@PathVariable(name = "text") String text) {
        List<Card> cards = cardService.searchCardsByText(text);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        User result = userService.addUser(userDto.getEmail(), userDto.getPassword(), userDto.getFullName());
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/user-data")
    public ResponseEntity<?> getUserData() {
        User user = userDataService.getCurrentUser();
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/update-profile-data")
    public ResponseEntity<?> updateProfileData(@RequestBody UserDto userDto) {
        User user = userDataService.getCurrentUser();
        if (user != null && user.getEmail().equals(userDto.getEmail())) {
            user.setFullName(userDto.getFullName());
            User result = userService.updateUserData(user);
            if (result != null) {
                return ResponseEntity.ok(result);
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UserDto userDto) {
        User user = userDataService.getCurrentUser();
        if (user != null && user.getEmail().equals(userDto.getEmail()) && passwordEncoder.matches(userDto.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(userDto.getNewPassword()));
            User result = userService.updateUserData(user);
            if (result != null) {
                return ResponseEntity.ok(result);
            }
        }
        return ResponseEntity.badRequest().build();
    }
}
