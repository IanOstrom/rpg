namespace SpriteKind {
    export const ClassChoice = SpriteKind.create()
}
statusbars.onZero(StatusBarKind.Health, function (status) {
	
})
function setupHeroStatusBars () {
    heroHealthBar = statusbars.create(20, 6, StatusBarKind.Health)
    heroManaBar = statusbars.create(20, 6, StatusBarKind.Energy)
    heroHealthBar.value = 100
    heroManaBar.value = 100
    heroHealthBar.positionDirection(CollisionDirection.Left)
    heroManaBar.positionDirection(CollisionDirection.Right)
    heroHealthBar.setOffsetPadding(50, 0)
    heroManaBar.setOffsetPadding(50, 0)
    heroHealthBar.setColor(2, 15)
    heroManaBar.setColor(8, 15)
    heroHealthBar.setBarBorder(1, 13)
    heroManaBar.setBarBorder(1, 13)
    heroHealthBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    heroManaBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
}
function chooseClass () {
    fighter = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f f f f d d d d d e e f . . 
        . f d d d d f 4 4 4 e e f . . . 
        . f b b b b f 2 2 2 2 f 4 e . . 
        . f b b b b f 2 2 2 2 f d 4 . . 
        . . f c c f 4 5 5 4 4 f 4 4 . . 
        . . . f f f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.ClassChoice)
    mage = sprites.create(img`
        . . . . . . . c c c . . . . . . 
        . . . . . . c b 5 c . . . . . . 
        . . . . c c c 5 5 c c c . . . . 
        . . c c b c 5 5 5 5 c c c c . . 
        . c b b 5 b 5 5 5 5 b 5 b b c . 
        . c b 5 5 b b 5 5 b b 5 5 b c . 
        . . f 5 5 5 b b b b 5 5 5 c . . 
        . . f f 5 5 5 5 5 5 5 5 f f . . 
        . . f f f b f e e f b f f f . . 
        . . f f f 1 f b b f 1 f f f . . 
        . . . f f b b b b b b f f . . . 
        . . . e e f e e e e f e e . . . 
        . . e b c b 5 b b 5 b f b e . . 
        . . e e f 5 5 5 5 5 5 f e e . . 
        . . . . c b 5 5 5 5 b c . . . . 
        . . . . . f f f f f f . . . . . 
        `, SpriteKind.ClassChoice)
    fighter.setPosition(40, 30)
    mage.setPosition(120, 30)
    fighter.sayText("Fighter")
    mage.sayText("Mage")
    story.printCharacterText("Choose your class")
    story.showPlayerChoices("Fighter", "Mage")
    sprites.destroyAllSpritesOfKind(SpriteKind.ClassChoice)
    return story.getLastAnswer()
}
function spawnPlayer (_class: string) {
    Hero = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    sprites.setDataString(Hero, "Class", _class)
    sprites.setDataNumber(Hero, "ClassNumber", classChoices.indexOf(sprites.readDataString(Hero, "Class")))
    Hero.setImage(heroImages[sprites.readDataNumber(Hero, "ClassNumber")])
    sprites.setDataNumber(Hero, "XP", 0)
    sprites.setDataNumber(Hero, "HP", HPbyClass[sprites.readDataNumber(Hero, "ClassNumber")])
    sprites.setDataNumber(Hero, "maxHP", HPbyClass[sprites.readDataNumber(Hero, "ClassNumber")])
    sprites.setDataNumber(Hero, "Mana", manaByClass[sprites.readDataNumber(Hero, "ClassNumber")])
    sprites.setDataNumber(Hero, "maxMana", manaByClass[sprites.readDataNumber(Hero, "ClassNumber")])
    sprites.setDataString(Hero, "Name", game.askForString("What is your name?"))
    setupHeroStatusBars()
    controller.moveSprite(Hero)
}
sprites.onCreated(SpriteKind.Player, function (sprite) {
	
})
let Hero: Sprite = null
let mage: Sprite = null
let fighter: Sprite = null
let heroManaBar: StatusBarSprite = null
let heroHealthBar: StatusBarSprite = null
let manaByClass: number[] = []
let HPbyClass: number[] = []
let heroImages: Image[] = []
let classChoices: string[] = []
classChoices = ["Fighter", "Mage"]
heroImages = [img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f f f f d d d d d e e f . . 
    . f d d d d f 4 4 4 e e f . . . 
    . f b b b b f 2 2 2 2 f 4 e . . 
    . f b b b b f 2 2 2 2 f d 4 . . 
    . . f c c f 4 5 5 4 4 f 4 4 . . 
    . . . f f f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, img`
    . . . . . . . c c c . . . . . . 
    . . . . . . c b 5 c . . . . . . 
    . . . . c c c 5 5 c c c . . . . 
    . . c c b c 5 5 5 5 c c c c . . 
    . c b b 5 b 5 5 5 5 b 5 b b c . 
    . c b 5 5 b b 5 5 b b 5 5 b c . 
    . . f 5 5 5 b b b b 5 5 5 c . . 
    . . f f 5 5 5 5 5 5 5 5 f f . . 
    . . f f f b f e e f b f f f . . 
    . . f f f 1 f b b f 1 f f f . . 
    . . . f f b b b b b b f f . . . 
    . . . e e f e e e e f e e . . . 
    . . e b c b 5 b b 5 b f b e . . 
    . . e e f 5 5 5 5 5 5 f e e . . 
    . . . . c b 5 5 5 5 b c . . . . 
    . . . . . f f f f f f . . . . . 
    `]
HPbyClass = [12, 8]
manaByClass = [4, 12]
spawnPlayer(chooseClass())
game.onUpdateInterval(1000, function () {
	
})
