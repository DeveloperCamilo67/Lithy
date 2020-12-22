import React, { useRef, useState } from "react";
import {
    StatusBar,
    Image,
    LayoutAnimation,
    TouchableOpacity,
    View,  StyleSheet, Alert, ScrollView

} from "react-native";

import Constants from 'expo-constants';
import {
    useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"


import { AppLoading } from "expo"
import { Paragraph, Title, Subheading, Headline, Caption, Button} from 'react-native-paper';

import * as firebase from "firebase";
import {
    Container,
    Header,
    Post,

    BackButton,
    InputContainer,
    Avatar,
    TextInputContainer,
    Photo,
    ViewPhoto,
    ImageState,
    Txt,
    TitleDos,
    Logo,
    HeaderDos,

} from "./styles";
import { FontAwesome5, Entypo, MaterialCommunityIcons } from "@expo/vector-icons/";

function TerminoScreen({ navigation }) {

    LayoutAnimation.easeInEaseOut();

    const [fontsLoaded, error] = useFonts({
        Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
        Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
        Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
        Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (

        <Container>
            <Header>

                <BackButton onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#87d396" />
                </BackButton>
                <View>
                    <Txt style={{ fontFamily: "Poppins_400Regular" }}>Términos de uso</Txt>
                </View>

            </Header>
            <ScrollView>


                <Title
                    style={{ textAlign: "center", padding: 10, fontFamily: "Poppins_500Medium" }}
                >
                    Te damos la bienvenida a Lithy

        </Title>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20,  }}
                >
                    <Caption style={styles.caption}>


                        Estas Condiciones de uso rigen el uso de Lithy e incluyen
                        información sobre el Servicio de Lithy, que se detalla
                        a continuación. Cuando creas una cuenta de Lithy o usas la
                        plataforma, aceptas estas condiciones.
                    </Caption>

                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >

                    <Caption style={styles.caption}>
                        Aceptamos proporcionarte el Servicio de Lithy, que incluye todos los
                        productos, las funciones, las apps, los servicios, las tecnologías y
                        el software que ofrecemos para cumplir la misión de Lithy: acercarte
                        a las personas y cosas que te encantan.
                  </Caption>



                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, marginTop:20, color:'#5bac6b',
                    fontFamily: "Poppins_500Medium" 
                }}
                >
                    1.- Fomentar un ambiente positivo, inclusivo y seguro.
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Desarrollamos y usamos herramientas, y ofrecemos recursos a los miembros 
        de nuestra comunidad que contribuyen a que estos vivan experiencias positivas 
        e inclusivas, incluso cuando creemos que pueden necesitar ayuda. También contamos 
        con equipos y sistemas cuyo trabajo es combatir el abuso y las violaciones de nuestras 
        Condiciones y políticas, así como combatir comportamientos perjudiciales y engañosos.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Usamos toda la información que tenemos, incluida la tuya, para proteger nuestra plataforma.
        Asimismo, es posible que compartamos información sobre usos indebidos o contenido
        perjudicial con otras empresas o con las fuerzas del orden.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, marginTop:20, color:'#5bac6b',
                    fontFamily: "Poppins_500Medium" 
                }}
                >
                    2.- Tus compromisos.
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    ¿Quién puede usar Lithy?. Queremos que nuestro Servicio sea lo más
        inclusivo y abierto posible, pero también queremos que sea seguro y 
        cumpla con la ley. Para ello, es necesario que te comprometas a cumplir 
        algunas restricciones a fin de formar parte de la comunidad de Lithy.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Debes tener al menos 13 años o la edad legal mínima en 
          tu país para usar Lithy.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    No debes tener el uso de ningún aspecto de nuestro Servicio en
            virtud de las leyes aplicables o la utilización de servicios relacionados 
            con pagos si estás en una lista de partes denegadas aplicable.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    No debemos haber inhabilitado previamente tu cuenta debido a una 
          infracción de la ley o a cualquiera de nuestras políticas.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, marginTop:20, color:'#5bac6b',
                    fontFamily: "Poppins_500Medium" 
                }}
                >
                    3.- Cómo no utilizar Lithy.
                </Paragraph>

                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    No puedes hacerte pasar por otra persona ni brindar información incorrecta.
        No es necesario que develes tu identidad en Lithy. No obstante, debes 
        proporcionarnos información precisa y actualizada (incluida la información de registro). 
        Asimismo, no puedes hacerte pasar por otra persona ni crear una cuenta en nombre de 
        alguien más, a menos que cuentes con su permiso expreso.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    No puedes publicar información privada o confidencial ni realizar 
        actividades que infrinjan los derechos de otra persona, incluidos los 
        derechos de propiedad intelectual.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, marginTop:20, color:'#5bac6b',
                    fontFamily: "Poppins_500Medium" 
                }}
                >
                    4.- Permisos que nos concedes.
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Permiso para usar tu nombre de usuario, foto del perfil e información 
        sobre tus relaciones y las acciones que realizas con cuentas, anuncios y contenido patrocinado.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Nos concedes permiso para mostrar tu nombre de usuario, foto del perfil e información 
        sobre las acciones que realizas (como los Me gusta) junto a cuentas, anuncios, ofertas y otro contenido patrocinado, o en relación con ellos, 
        que sigues o con los que interactúas y que se muestran.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Aceptas que podemos descargar e instalar actualizaciones del Servicio en tu dispositivo.
                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, marginTop:20, color:'#5bac6b',
                    fontFamily: "Poppins_500Medium" 
                }}
                >
                    5.- Derechos adicionales que nos reservamos.
                   
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Si seleccionas un nombre de usuario o un identificador similar para tu cuenta, podemos 
        cambiarlo si lo consideramos apropiado o necesario. Por ejemplo, si infringe los derechos 
        de propiedad intelectual de otra persona o suplanta la identidad de otro usuario.                  </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Si usas contenido protegido por derechos de propiedad intelectual que poseemos e incluimos 
        en nuestro Servicio, tales como imágenes, diseños, videos o sonidos que ofrecemos y que tú 
        agregas al contenido que creas o compartes, nos reservamos todos los derechos sobre dicho contenido,
         pero no sobre los tuyos.
                        </Caption>
                  
                </Paragraph>
                
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, color:'#5bac6b',
                    fontFamily: "Poppins_500Medium" 
                }}
                >
                    6.- Eliminación de contenido e inhabilitación o cancelación de la cuenta.
                   
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption style={styles.caption}>
                    Podemos eliminar cualquier contenido o información que compartas en el Servicio si 
        consideramos que infringe estas Condiciones de uso o nuestras políticas
                        </Caption>
                  
                </Paragraph>
                <Paragraph
                    style={{ textAlign: "justify", margin: 20, }}
                >
                    <Caption>
              
                        </Caption>
                    
                </Paragraph>
            
            </ScrollView>
        </Container>
    );
}

export default TerminoScreen;

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    caption:{
        fontFamily: "Poppins_400Regular"
    }
})


