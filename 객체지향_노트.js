/*
1. 객체 지향 프로그램
    - '객체'간의 상호작용을 중심으로 하는 프로그래밍  
        - 객체는 객체의 상태를 나타내는 '변수'(프로퍼티) 와 
                객체의 행동을 나타내는 '함수'(메서드) 로 구성
*/

//2. 객체 만들기 1-1 Object Literal

const user = {   //object literal, 객체를 나타내는 문자열
    email: 'juyoungkim1987@gmail.com',  //프로퍼티
    birthdate: '1987-01-09',  //프로퍼티
    buy(item) {   //메소드(method), 함수
        console.log(`${this./*현재 담겨져 있는 객체 안*/email} buys ${item.name}`);
    } ,
};   

const electronics = {
    name: '노트북',
    price: 1000000,
}

console.log(user.email);
console.log(user.birthdate);
user.buy(electronics);

//3. 객체 만들기 1-2 Factory function, 객체를 편히 만들어주는 함수

function createUser(email, birthdate) {
    const user = {  
        email: email,  
        birthdate: birthdate,  
        buy(item) {   
            console.log(`${this.email} buys ${item.name}`);
        },
    };   
    return user;
}

const user1 = createUser('loopy-777@daum.net', '1997-05-09');
const user2 = createUser('rlawndud0109@naver.com', '1957-03-20');

console.log(user1.email);
user2.buy(electronics);

//4. 객체 만들기 2 Constructor function, 생성자 함수, 객체를 생성할 수 있는 함수, new를 꼭 붙여서 객체를 생성해야한다

function User(email, birthdate) {  //함수의 첫번째 글자를 보통 대문자로 적어준다
    this.email = email;   //this가 매번 생성되는 해당 객체를 가르킨다
    this.birthdate = birthdate;  
    this.buy = function (item) {   
        console.log(`${this.email} buys ${item.name}`);
    };
}

const user3 = new User('nuna_vagopa@hotmail.com','1987-05-09'); //new를 사용해서 새로운 객체 생성
console.log(user3.email);
console.log(user3.birthdate);
user3.buy(electronics);

//5. 객체 만들기 3 Class

class Classuser {   //객체와 함수 여러개가 한곳에 포함되어 작동하는 집합체, 객체 부분과 함수 부분을 구분지어 작성한다
    constructor(email, birthdate) {
        this.email = email;
        this.birthdate = birthdate;
    }

    buy(item) {
        console.log(`${this.email} buys ${item.name}`);
    }
}

const user4 = new Classuser('kjyloopy@gmail.com', '1987-01-09');
console.log(user4.email);
user4.buy(electronics);

//------------------------------------------------------------------------------------------
// 객체 지향 프로그래밍의 4개의 기둥(추상화, 캡슐화, 상속, 다형성)

//1. 추상화
//  - 어떤 구체적인 존재를 원하는 방향으로 간략화해서 나타내는 것
// 프로퍼티나 메소드의 이름들이 직관적으로 이해하기 쉽게 잘 정해서 적어야 한다, 주석 적는것을 습관화 하자
// 누가봐도 최대한 이해하기 쉽도록 생각해서 작성하자

//2. 캡슐화
//객체의 특정 프로퍼티에 직접 접근하지 못하도록 막는 것
//값에 대한 유효성 검사가 이루어져 올바르게 해당값을 작성했는지 확인하는 setter를 돌린다

class Classuser1 {   //객체와 함수 여러개가 한곳에 포함되어 작동하는 집합체, 객체 부분과 함수 부분을 구분지어 작성한다
    constructor(email, birthdate) { //email과 생년월일을 받아오면 해당 객체를 생성한다 (1번) 그리고 다시 (4번)
        this.email = email; //getter 함수에서 email이 재 설정돼 this.email로 부여된다 
        this.birthdate = birthdate; //
    }

    buy(item) {  //buy메소드가 실행되면 제일 마지막 순서 (5)째로 실행된다
        console.log(`${this.email} buys ${item.name}`); //밑 getter에서 새롭게 설정된 email의 값이 이곳에서 표현된다
    }

    get email() {  //setter에서 설정한 값을 get에서 가져와서 작동한다 (3번)
        return `이메일주소는 ${this._email}` //이때 return이 되는 값은 email에 대한 값이다
    }

    set email(address) {  //(2번)
        if (address.includes('@')) {
            this._email = address;  //underbar가 적힌 email은 새롭게 설정한 프로퍼티이다
        } else {
            throw new Error('올바르지 않은 형식의 주소입니다.');
        }
    }
}

const user5 = new Classuser1('juyoungkim@gmail.com', '1987-01-09'); //캡슐화가 되어있는 class 프로그램에 값을 넣는다
console.log(user5.email);  //당연히 juyoungkim이다 setter에서 _email로 바뀌어서 저장됐고 getter에서 email값을 this._email로 설정해서 this.email로 다시 넣어줌
console.log(user5._email);  //setter 실행할때 _email이란 프로퍼티가 만들어져서 이것도 juyoungkim이다
console.log(user5); //객체 내부에 email프로퍼티도 있고 _email프로퍼티도 있다 setter때 _email프로퍼티 생성, getter로 그 값을 email프로퍼티 값으로 리턴
user5.buy(electronics); //getter의 리턴값이 this.email로 들어가게 됨. 왜냐면 email 값을 가져와 리턴할때 새롭게 setting 된 email값을 보낸다.
user5.email = 'nuna_vagopa@hotmail.com'; //이메일 주소를 새롭게 설정하면 객체는 link되어있기 때문에 위에가 보기 복잡해진다. 다시 한번 link개념을 떠올려라
console.log(user5.email);
console.log(user5);
user5.buy(electronics);
//set 이라는 setter 함수를 작성했고, 이는 실수로 user.email = 'juyoungkim' 이라고 작성했다면
//user.email 프로퍼티 값을 juyoungkim 으로 바꾸는게 아니라, 미리 작성해둔 set 함수를 돌게된다
//도는 이유는 .email을 하면 email 함수를 돌게끔 세팅해두었기 때문이다.
//set 함수를 돌면서 email 값으로 작성한 곳에 '@'가 들어있다면 올바른 이메일 형식으로 보고 
//email 프로퍼티의 값으로 적은 address를 할당해준다. 만약 '@'가 주소에 있지 않다면
//에러 메세지를 보내주는 setter 함수이다. 실수를 방지하게 해준다. 
