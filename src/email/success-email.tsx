import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type SuccessEmailProps = {
	message: string;
	receiverEmail: string;
};

export default function SuccessEmail({ message, receiverEmail }: SuccessEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Successfully sent email!</Preview>
			<Tailwind>
				<Body className="bg-gray-100 text-black">
					<Container>
						<Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
							<Heading className="leading-tight">
								You successfully sent an email to Marco Antolini at {receiverEmail}
							</Heading>
							<Text>Thanks for contacting me, you will receive a reply soon!</Text>
							<Hr />
							<Text>Your message was:</Text>
							<Text className="bg-slate-200 p-4">{message}</Text>
							<Hr />
							<Text className="text-sm text-gray-600">This is an automated email, do not reply.</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
