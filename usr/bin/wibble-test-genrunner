#!/usr/bin/perl

my $set, %tests, %prefix, %filename;

my $mode = $ARGV[0];
shift @ARGV;

sub process() {
    $file = shift;
    my $in;
    open IN, "$file";
    $in .= $_ while (<IN>);
    close IN;

    $set = "not defined";
    my $nest = 0, $depth = 0;
    # TODO we should push/pop on { and }
    for (split /[{]/, $in) {
        $nest+=2; # for each item in split /}/, we decrement by 1
                  # meaning decrement by number of }, plus one 1
        for (split /[}]/, $_) {
            $nest--;
            if ($nest < $depth) {
                $set = "not defined";
                $depth = 0;
            }
            for (split /[;]/, $_) {
                #print "parsing: $_\n";
                if (/struct ([tT]est_?)([A-Za-z]+)/) {
                    #push @sets, $1;
                    $set = $2;
                    $filename{$set} = $file;
                    $prefix{$set} = $1;
                    $depth = $nest;
                } elsif (/Test[ \t\n]+([a-zA-Z_1-9]+)[ \t\n]*\(/) {
                    if ($set eq "not defined") {
                        print STDERR "W: test found out of scope of a Test structure, ignoring\n";
                    } else {
                        $test{$set} = () unless ($test{$set});
                        push @{$tests{$set}}, $1;
                    }
                }
            }
        }
    }
}

sub dumpfile() {
    my $file = shift;
    my $filecpp = $file;
    $filecpp =~ s/.test.h$/.cpp/;
    $filecpp =~ s,/,_,g;
    print "#undef NDEBUG\n";
    print "#include \"$file\"\n";
    print "#define RUN(x,y) x().y()\n";
    
    for (keys %tests) {
        my $set = $_;
        if ( $filename{$set} eq $file ) {
            for (@{$tests{$set}}) {
                print "void run_${set}_$_() {";
                print " RUN( $prefix{$set}$set, $_ ); }\n";
            }
        }
    }
}
    
sub dumpmain() {
    print "#undef NDEBUG\n";
    print "#include <wibble/test.h>\n";
    print "#include <wibble/test-runner.h>\n";
    
    for (keys %tests) {
        my $set = $_;
        for (@{$tests{$set}}) {
            print "void run_${set}_$_();\n";
        }
        
        print "RunTest run_${set}[] = {\n";
        print "\t{ \"$_\", run_${set}_$_ },\n" for (@{$tests{$set}});
        print "};\n";
    }
    
    print "RunSuite suites[] = {\n";
    for (keys %tests) {
        my $count = scalar @{$tests{$_}};
        print "{ \"$_\", run_$_, $count },\n";
    }
    print "};\n";
    print "#include <wibble/test-main.h>\n";
    #print "int assertFailure = 0;\n";
}
for $file (@ARGV) {
    &process ($file);
}
    
if ($mode eq "header") {
    for $file (@ARGV) {
        &dumpfile($file);
    }
}

if ($mode eq "main") {
    &dumpmain;
}
