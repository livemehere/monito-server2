CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(80) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `birth` DATE NOT NULL,
  `job` VARCHAR(100) NOT NULL,
  `profile_img` VARCHAR(300) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE)
  ENGINE = InnoDB;
  
  CREATE TABLE IF NOT EXISTS `mydb`.`record` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `cumulative_time` INT NOT NULL DEFAULT 0,
  `start_date` DATE NULL DEFAULT now(),
  `endDate` DATE NULL DEFAULT now(),
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_study_data_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_data_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`time` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total_time` INT NOT NULL DEFAULT 0,
  `focus_time` INT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_focus_data_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_focus_data_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`calendar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `detail` VARCHAR(300) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_calendar_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_calendar_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`study_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_name` VARCHAR(100) NOT NULL,
  `is_recruit` TINYINT NOT NULL DEFAULT 1,
  `max_member` INT NOT NULL DEFAULT 10,
  `now_menber` INT NOT NULL,
  `focus_point` INT NOT NULL DEFAULT 0,
  `total_time` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;